var doGet = function (e) {
  var libName = "App";

  // Early return for getData action
  if (e && e.parameter && e.parameter.action === "getData") {
    return this[libName].handleRequest(e);
  }

  // Determine funcTres
  var funcTres = e && e.parameter["file"] ? e.parameter["file"] : "uiAccess";

  // Logging
  if (e && e.parameter["func"]) {
    console.log(JSON.stringify(e));
  } else {
    var argsEd = this[libName].testlt();
    if (typeof this[libName].mis === "function") {
      var misArgs;
      if (typeof argsEd === "string") {
        misArgs = [argsEd];
      } else if (typeof argsEd === "object" && argsEd !== null && argsEd.name) {
        misArgs =
          argsEd.parameters && argsEd.parameters.length > 0
            ? [argsEd.name, ...argsEd.parameters]
            : [argsEd.name];
      } else {
        console.log("Unexpected argsEd type: ", argsEd);
        misArgs = ["Invalid Entry"];
      }

      e = this[libName].objectOfS(
        ["parameter"],
        [
          [
            ["func", "mis"],
            ["args", misArgs],
            ["action", "getData"],
          ],
        ],
        functionRegistry.time,
      );
      console.log(JSON.stringify(e));
    }
  }

  // Logging
  console.log(
    functionRegistry.time +
      "\n" +
      arguments.callee.name +
      "\ne is !" +
      !e +
      ", = " +
      JSON.stringify(e),
  );

  var funcUno = e.parameter["func"];
  var funcDos = e.parameter["args"];
  const vLen = [83, 94, 97, 99, 101, 103, 136, 132];
  var payLoad = {}; // Initialize payload

  // --- BEGIN Refactored payLoad processing ---
  let finalAppLContent = "";
  let iframeSrc =
    "https://www.clubhouse.com/@fabianlewis?utm_medium=ch_profile&utm_campaign=lhTUtHb2bYqPN3w8EEB7FQ-247242"; // Default iframe src
  let finalFeedDivContent = "";

  try {
    let rawFuncResult = null;
    if (this[libName] && typeof this[libName][funcUno] === "function") {
      let parsedFuncArgs = [];

      // Check if funcDos is already an array (from internal re-assignment by objectOfS)
      if (Array.isArray(funcDos)) {
        parsedFuncArgs = funcDos; // It's already the array we want
      } else if (typeof funcDos === "string" && funcDos) {
        try {
          parsedFuncArgs = JSON.parse(funcDos);
          if (!Array.isArray(parsedFuncArgs)) {
            parsedFuncArgs = [parsedFuncArgs];
          }
        } catch (jsonError) {
          parsedFuncArgs = [funcDos]; // Treat as a single string argument if not valid JSON
        }
      } else {
        // Handle other cases for funcDos, or it might be null/undefined
        finalArgsForFunction = [];
      }
      rawFuncResult = this[libName][funcUno].apply(this, parsedFuncArgs);
    } else {
      console.error(
        `Error: Function "${funcUno}" not found or not callable in "${libName}".`,
      );
      rawFuncResult = {
        type: "error",
        message: `Function "${funcUno}" not found.`,
      };
    }

    // Helper function to process any value (rawFuncResult or a nested property like .app)
    function processContent(content) {
      if (!content) {
        return { type: "unknown", data: null };
      }

      // Regex for a basic HTTP/HTTPS URL validation
      // This regex is fairly comprehensive for common URLs but can be refined if needed.
      const urlRegex =
        /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/i;

      // 1. Handle UrlFetchApp.HTTPResponse
      if (
        typeof content.getResponseCode === "function" &&
        typeof content.getContentText === "function"
      ) {
        const contentType = content.getHeaders()["Content-Type"] || "";
        const responseText = content.getContentText();

        if (contentType.includes("application/json")) {
          try {
            return { type: "jsonData", data: JSON.parse(responseText) };
          } catch (e) {
            return {
              type: "text",
              data: `Error parsing JSON from URL fetch: ${responseText}`,
            };
          }
        } else if (contentType.includes("text/html")) {
          return { type: "html", data: responseText };
        } else {
          return { type: "text", data: responseText };
        }
      }
      // 2. Handle Google Apps Script HtmlOutput
      else if (typeof content.getContent === "function") {
        return { type: "html", data: content.getContent() };
      }
      // 3. Handle String content (URL, JSON, HTML, or plain text)
      else if (typeof content === "string") {
        // --- MODIFIED: Use Regex for URL check ---
        if (urlRegex.test(content)) {
          return { type: "url", data: content }; // New type "url" for strings
        }
        // --- END MODIFIED ---

        try {
          const parsedJson = JSON.parse(content);
          return { type: "jsonData", data: parsedJson };
        } catch (jsonError) {
          // Not JSON, treat as HTML or plain text
          if (content.trim().startsWith("<") && content.trim().endsWith(">")) {
            // More robust HTML check
            return { type: "html", data: content };
          } else {
            return { type: "text", data: content };
          }
        }
      }
      // 4. Handle Generic Objects
      else if (typeof content === "object" && content !== null) {
        // If the object itself contains structured data you want to directly use
        if (content.html) {
          // If there's an explicit 'html' property
          return { type: "html", data: content.html };
        }
        if (content.url && urlRegex.test(content.url)) {
          // Use regex for object.url as well
          return { type: "url", data: content.url };
        }
        // Add other specific object property checks here if needed
        return { type: "object", data: content }; // Default for other objects
      }
      // 5. Default unknown
      else {
        return { type: "unknown", data: content };
      }
    }

    // Process the main rawFuncResult
    payLoad = processContent(rawFuncResult);

    // If rawFuncResult was an object and it had an 'app' property,
    // we should specifically process that 'app' property as well.
    // This assumes that the 'app' property might override or provide the primary content.
    if (
      rawFuncResult &&
      typeof rawFuncResult === "object" &&
      rawFuncResult.app
    ) {
      console.log("the 'app' property:", rawFuncResult);
      const appProcessed = processContent(rawFuncResult.app);
      // Overwrite payLoad if 'app' property yields more specific or desired content
      // You might want more sophisticated merging here if both rawFuncResult and .app hold valuable distinct data.
      if (
        appProcessed.type !== "unknown" ||
        (appProcessed.data !== null && appProcessed.data !== undefined)
      ) {
        payLoad = appProcessed;
        // Also, if rawFuncResult has a 'link' or 'vApp' property, ensure it's retained if meaningful
        // This part of merging can be tailored to your specific needs if 'link' or 'vApp'
        // represent something distinct from the 'app' content but should still be propagated.
        if (rawFuncResult.link && !payLoad.link) {
          // Only add if payLoad doesn't already have it
          payLoad.link = rawFuncResult.link;
        }
        if (rawFuncResult.index && !payLoad.index) {
          // Only add if payLoad doesn't already have it
          payLoad.index = rawFuncResult.index;
        }
      }
    }

    console.log("payLoad.type === ", payLoad.type);
    console.log("payLoad.data === ", payLoad.data);

    // Now, use the structured 'payLoad' to set the final content variables
    // (This part needs adjustments to handle the new "url" type)
    if (payLoad.type === "html") {
      iframeSrc = payLoad.index; // Assign iframeSrc
      finalAppLContent = payLoad.data;
      finalFeedDivContent = `URL provided: <a href="${payLoad.link}" target="_blank">${payLoad.link}</a>`;
    } else if (payLoad.type === "url") {
      // --- NEW: Handle "url" type directly ---
      iframeSrc = payLoad.data; // Assign the URL to iframeSrc
      finalAppLContent = `URL provided: <a href="${payLoad.index}" target="_blank">${payLoad.index}</a>`;
      finalFeedDivContent = `URL provided: <a href="${payLoad.link}" target="_blank">${payLoad.link}</a>`;
    } else if (payLoad.type === "jsonData") {
      iframeSrc = payLoad.index; // Assign iframeSrc
      finalAppLContent = `<pre>${JSON.stringify(payLoad.data, null, 2)}</pre>`;
      finalFeedDivContent = `URL provided: <a href="${payLoad.link}" target="_blank">${payLoad.link}</a>`;
    } else if (payLoad.type === "text") {
      iframeSrc = payLoad.index; // Assign iframeSrc
      finalAppLContent = payLoad.data;
      finalFeedDivContent = `URL provided: <a href="${payLoad.link}" target="_blank">${payLoad.link}</a>`;
    } else if (payLoad.type === "object") {
      // Here, if payLoad.data is an object, you need to decide how to display it.
      // It could contain sub-properties you want to render.
      if (payLoad.data.html || payLoad.data.app) {
        finalAppLContent = payLoad.data.html || payLoad.data.app;
        // If the object itself contains a URL, use it for iframeSrc
        iframeSrc = payLoad.data.url || iframeSrc;
      } else if (payLoad.data.url) {
        // If the object explicitly has a 'url' property
        iframeSrc = payLoad.data.url;
        finalAppLContent = `URL provided: <a href="${payLoad.index}" target="_blank">${payLoad.index}</a>`;
        finalFeedDivContent = `URL provided: <a href="${payLoad.link}" target="_blank">${payLoad.link}</a>`;
      } else {
        // Default way to display a generic object: stringify it
        iframeSrc = payLoad.index; // Assign iframeSrc
        finalAppLContent = `<pre>${JSON.stringify(payLoad.data, null, 2)}</pre>`;
        finalFeedDivContent = `URL provided: <a href="${payLoad.link}" target="_blank">${payLoad.link}</a>`;
      }
    } else if (payLoad.type === "unknown" || payLoad.type === "error") {
      finalAppLContent = `<div>Error: ${payLoad.message || payLoad.data || "Unknown error."}</div>`;
      finalFeedDivContent = `Error: ${payLoad.message || payLoad.data || "Unknown error."}`;
    }
  } catch (error) {
    console.error(`Error during payload processing:`, error);
    finalAppLContent = `<div>Critical Error: ${error.message}</div>`;
    finalFeedDivContent = `Critical Error: ${error.message}`;
    iframeSrc = ""; // Clear iframe on critical error
  }
  // --- END Refactored payLoad processing ---

  var foobarr = funcUno || "renderFile"; // Still using this, ensure it's a function name string
  var libFunc = foobarr; // Redundant variable
  var htmlArray = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS Section3.Challenge1 cors edgarFriendly editor ssForms styling theRoll theWorks uiAccess cGWI`,
  ]
    .toString()
    .split(" ");
  var rndPage =
    htmlArray[Math.floor(Math.random() * Math.floor(htmlArray.length))];

  // Simplify args logic:
  var args = "theWorks"; // Default value
  if (e.parameter["args"]) {
    if (Array.isArray(e.parameter["args"])) {
      const firstArg = e.parameter["args"][0];
      if (htmlArray.includes(firstArg)) {
        args = firstArg;
      }
    } else if (htmlArray.includes(e.parameter["args"])) {
      args = e.parameter["args"];
    }
  }
  var tres = htmlArray.findIndex(function (element) {
    return element === funcTres;
  });

  // Determine templateName (not directly used in the provided template, but good for context)
  let templateName = e.parameter["func"];
  if (e.parameter["func"] === "crmGWI") {
    templateName = "General Work Invoice";
  } else if (e.parameter["func"] === "crmEBI") {
    templateName = "Employee Benefits Inquiry";
  }

  // Final renderTemplate call
  return renderTemplate(
    `<!DOCTYPE html>
    <html id="wildSageBrushDoGet">
    <head>
      <base target="_self">
      <meta charset="utf-8">
      <meta name="Subscribe" content="Pro Media Snip">
      <meta name=viewport content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
      <style>
        body {
          flex-grow: 1;
          color:blue;
          text-decoration:bold;
          flex-flow: row wrap;
          grid-column: 1;
          grid-row: 1;
          text-align: center;
          align-content: flex-start;
          overflow: auto;
        }
        #jsonInput {
          display: none;
          width: 100%;
          height: 8vh; /* Or whatever height you need */
          margin:10px auto;
          padding: 0px;
          box-sizing: border-box; /* Include padding in width/height */
          border:1px solid #ccc;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'monospace'; /* Monospaced font is crucial */
          font-size: 14px;
          line-height: 1.5; /* Good for readability */
          white-space:pre-wrap;
          text-align:left;
          background-color: #282c34; /* Dark background common for code editors */
          color: #abb2bf; /* Light text color for contrast */
          resize: vertical; /* Allow vertical resizing, or 'none' to disable */
          overflow: auto; /* Enable scrolling if content exceeds height */


          /* Focus state */
          outline: none; /* Remove default blue outline on focus */
          box-shadow: 0 0 0 2px rgba(97, 175, 239, 0.5); /* Custom focus highlight */
          transition: box-shadow 0.2s ease-in-out;
        }
        /* Style for the new textarea */
        #indexBeta {
          /* Basic layout and appearance */
          width: 100%;
          height: 25vh; /* Or whatever height you need */
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'monospace'; /* Monospaced font is crucial */
          font-size: 14px;
          line-height: 1.5; /* Good for readability */
          margin:10px auto;
          white-space:pre-wrap;
          text-align:left;
          padding: 0px;
          box-sizing: border-box; /* Include padding in width/height */
          border: 1px solid #333;
          background-color: #282c34; /* Dark background common for code editors */
          color: #abb2bf; /* Light text color for contrast */
          resize: vertical; /* Allow vertical resizing, or 'none' to disable */
          overflow: auto; /* Enable scrolling if content exceeds height */

          /* Hide default textarea scrollbar (optional, but common for custom scrollbars) */
          /* If you hide this, you'd need to implement custom scrollbars with JavaScript */
          /* -webkit-overflow-scrolling: touch; */ /* For smooth scrolling on touch devices */
          /* &::-webkit-scrollbar { display: none; } */
          /* & { -ms-overflow-style: none; scrollbar-width: none; } */


          /* Focus state */
          outline: none; /* Remove default blue outline on focus */
          box-shadow: 0 0 0 2px rgba(97, 175, 239, 0.5); /* Custom focus highlight */
          transition: box-shadow 0.2s ease-in-out;
        };

        #indexBeta,#jsonInput:focus {
            box-shadow: 0 0 0 2px rgba(97, 175, 239, 0.8); /* More prominent on focus */
        }

        /* Optional: Placeholder styling */
        #indexBeta,#jsonInput::placeholder {
            color: #616e7f;
        }
      </style>
    </head>
    <body>
      <div id="eObject"><input type="text" id="pageObj" value="" name="eObject" style="display: none"></div>
      <div>
        <?!= renBlob ?>
      </div>
    </body>
    <script>
      function serverSide(func, args) {
        return new Promise((resolve, reject) => {
          google.script.run
            .withSuccessHandler((result) => {
              resolve(result);
            })
            .withFailureHandler((error) => {
              console.log(error);
              // document.getElementById("test") does not exist, remove or fix
              // console.log(document.getElementById("test").innerHTML);
              reject(error);
            })
            .runBoilerplate(func, args)
        });
      };
      function clientSide(func, args) {
        return new Promise((resolve, reject) => {
          google.script.run
            .withSuccessHandler((result) => {
              resolve(result); // result will be { type: "...", data: "..." }
              console.log("Client-side: Page re-rendered with new content from server.");
            })
            .withFailureHandler((error) => {
              console.log(error);
              console.error("Client-side Error during full re-render:", error);
              alert("Error re-rendering: " + error.message);
              reject(error);
            })
            .runRenderPageWithNewE(func, args)
        });
      };
      var objUrl = document.getElementById("pageObj");
      const currentE = JSON.parse(<?= e ?>);
      const homePageUrl = <?= homePage ?>;

      console.log("Client-side: Initial doGet event object:", currentE);
      console.log("Client-side: Home Page URL:", homePageUrl);

      console.log("line 261");document.addEventListener("DOMContentLoaded", eRun);
      document.addEventListener("DOMContentLoaded", eRun)
      function eRun() {
        let initialArgs = currentE.parameter["args"];
        if (initialArgs !== undefined && initialArgs !== null) {
            if (typeof initialArgs === 'object') {
                objUrl.value = JSON.stringify(initialArgs, null, 2);
            }
            else {
                objUrl.value = initialArgs; // If it's a string directly
            }
        }
        else {
            objUrl.value = '[""]'; // Default if args is missing
        }
        objUrl.addEventListener("change", function() {
          // Parse the user's input as the new 'args' value
          // Allow direct strings or JSON arrays/objects
          let parsedE;
            try {
              parsedE = JSON.parse(this.value);
            } 
            catch (jsonError) {
              // If it's not valid JSON, treat it as a plain string
              parsedE = this.value;
            }

            // Create a *copy* of the original currentE
            const updatedClientE = JSON.parse(JSON.stringify(currentE));

            // Update ONLY the 'args' parameter
            updatedClientE.parameter["args"] = parsedE;

            alert("e object updated (check the console). You would now typically send this back to the server.");
            console.log("Updated e object:", objUrl.value);
            serverSide(updatedClientE.parameter["func"], [updatedClientE.parameter["args"]]).then(validationResult => {
              console.log("Actual validation result: " + JSON.stringify(validationResult));
              if (validationResult.app) { // Assumes validationResult has an 'app' property
                alert("e object validated successfully on the server");
                var textRes = <?= homePage ?> + "?func=" + updatedClientE.parameter["func"] + "&args=" + updatedClientE.parameter["args"];
                window.open(textRes);
              } else {
                alert("Server validation failed: Unknown error");
                console.error("Server validation failed:", validationResult);
              }
            }).catch(error => {
              if (updatedClientE.parameter["action"]) {
                alert("e object action required on the server");
                var textRes = <?= homePage ?> + "?action=" + updatedClientE.parameter["action"] + "&func=" + updatedClientE.parameter["func"] + "&args=" + updatedClientE.parameter["args"];
                window.open(textRes);
              }
              alert("Error during server validation: " + error);
              console.error("Server validation error:", error)
            });
          } catch(error) {
            alert("Error parsing JSON. Please ensure the input is valid JSON.");
            console.error("JSON parsing error:", error);
          };
        });
      };
      </script>
    </html>`,
    {
      renBlob: this[libName].contentApp(
        `
        <!DOCTYPE html>
        <html id="renderTemplate_blob" lang="en">
          <head>
            <base target="_self">
            <meta charset="utf-8">
            <meta name="doGet" content="Budget get Function">
            <meta name=viewport content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
            <style>
              body {
                flex-grow: 1;
                color:blue;
                text-decoration:bold;
                flex-flow: row wrap;
                grid-column: 1;
                grid-row: 1;
                text-align: center;
                align-content: flex-start;
                overflow: auto;
              }
            </style>
          </head>
          <body>
            <div id="coApp" style='display:"block";background-color: #ffc107;'>
              <?!= finalAppLContent ?>
          </body>
        </html>`,
        {
          finalAppLContent: finalAppLContent,
          iframeSrc: iframeSrc,
          finalFeedDivContent: finalFeedDivContent,
          tupL: htmlArray[tres] || args,
        },
      ),
      e: e,
      homePage: this[libName].getScriptUrl(),
    },
  );
};

var doGetGotRefactored = function (e) {
  var libName = "App";

  // Early return for getData action
  if (e && e.parameter && e.parameter.action === "getData") {
    return this[libName].handleRequest(e);
  }

  // Determine funcTres
  var funcTres = e && e.parameter["file"] ? e.parameter["file"] : "uiAccess";

  // Logging
  if (e && e.parameter["func"]) {
    console.log(JSON.stringify(e));
  } else {
    var argsEd = this[libName].testlt();
    if (typeof this[libName].mis === "function") {
      var misArgs;
      if (typeof argsEd === "string") {
        misArgs = [argsEd];
      } else if (typeof argsEd === "object" && argsEd !== null && argsEd.name) {
        misArgs =
          argsEd.parameters && argsEd.parameters.length > 0
            ? [argsEd.name, ...argsEd.parameters]
            : [argsEd.name];
      } else {
        console.log("Unexpected argsEd type: ", argsEd);
        misArgs = ["Invalid Entry"];
      }

      e = this[libName].objectOfS(
        ["parameter"],
        [
          [
            ["func", "mis"],
            ["args", misArgs],
            ["action", "getData"],
          ],
        ],
        Math.floor((this[libName].maxTime - (new Date() % (1000 * 60))) / 1000),
      );
      console.log(JSON.stringify(e));
    }
  }

  // Logging
  console.log(
    Math.floor((this[libName].maxTime - (new Date() % (1000 * 60))) / 1000) +
      "\n" +
      arguments.callee.name +
      "\ne is !" +
      !e +
      ", = " +
      JSON.stringify(e),
  );

  var funcUno = e.parameter["func"];
  console.log("e.parameter['args'] before funcDos:", e.parameter["args"]);
  var funcDos = e.parameter["args"];
  console.log("e.parameter['args'] after funcDos:", e.parameter["args"]);
  console.log("funcDos:", funcDos);
  const vLen = [83, 94, 97, 99, 101, 103, 136, 132];
  var payLoad = {}; // Initialize payload
  try {
    payLoad = this[libName][funcUno].apply(this, [funcDos]);

    var pApp = payLoad.app || payLoad || argsEd;
    var pLink = payLoad.link;
    let processedPayload = {
      type: "unknown",
      message: "Initial processing error",
    }; // Default

    if (typeof pApp === "string") {
      try {
        const jsonData = JSON.parse(pApp);
        processedPayload = {};
        payLoad = { type: "jsonData", data: payLoad.link };
      } catch (jsonError) {
        console.log("JSON Parse Error: " + jsonError + ", Input: " + pApp);
        try {
          const htmlDoc = XmlService.parse(pApp);
          const rootElement = htmlDoc.getRootElement(); // Get root
          if (!rootElement || rootElement.getName() !== "html") {
            throw new Error(
              "Not a valid HTML document (no <html> tag or invalid structure).",
            );
          }
          processedPayload = {};
          payLoad = { type: "htmlDoc", data: payLoad.link };
        } catch (htmlError) {
          console.log("HTML Parse Error: " + htmlError + ", Input: " + pApp);
          if (pApp.indexOf(") error: ") !== -1) {
            processedPayload = { type: "error", message: pApp };
          } else if (pApp.indexOf(") error: ") === -1) {
            var vUrl = this[libName].isValidUrl(pApp);
            if (!vUrl) {
              processedPayload = { type: "text", data: pApp };
            } else if (vUrl && !vUrl.hostname) {
              processedPayload = { type: "object", data: pApp };
              console.log(
                "pApp is a non-empty object.  Payload is: " +
                  JSON.stringify(payLoad),
              );
            } else if (vUrl && vUrl.hostname) {
              console.log(vUrl);
              !vUrl.matches
                ? console.error(" no vUrl matches")
                : console.log(" vUrl matches:", vUrl.matches);
              if (vUrl.matches) {
                if (!vLen.includes(pLink?.length)) {
                  console.log(!vLen.includes(pLink?.length));
                  console.log(" client");
                  processedPayload = {};
                  payLoad = { type: "client", data: payLoad.link };
                } else if (vLen.includes(pLink?.length)) {
                  console.log(vLen.includes(pLink?.length));
                  console.log(" webApp");
                  processedPayload = {};
                  payLoad = { type: "webApp", data: payLoad.link };
                }
              }
            }
          }
        }
      }
      if (processedPayload.type === "unknown") {
        console.log("Empty or unexpected response for string input: " + pApp);
        processedPayload = {
          type: "unknown",
          message: "Empty or unexpected string response",
        };
      }
    } else if (typeof pApp === "object") {
      if (Object.keys(pApp).length > 0) {
        if (!(pApp.hostname || pApp.url)) {
          processedPayload = { type: "object", data: pApp };
          console.log(
            "pApp is a non-empty object.  Payload is: " +
              JSON.stringify(payLoad),
          );
        } else {
          console.log(pApp);
          console.log(
            !pApp.hasOwnProperty("hostname"),
            !pApp.hasOwnProperty("url"),
          );
          console.log(" hostname, url ");
          if (
            (pApp.matches && !vLen.includes(pApp["matches"][0]?.length)) ||
            (pApp.url && !vLen.includes(pApp.url?.length))
          ) {
            console.log(
              !vLen.includes(pApp["matches"][0]?.length || pApp.url?.length),
            );
            console.log(" client");
            payLoad = { type: "client", data: pApp.url || payLoad.link };
          } else if (
            pApp.matches &&
            vLen.includes(pApp["matches"][0]?.length || pApp.url?.length)
          ) {
            console.log(
              vLen.includes(pApp["matches"][0]?.length || pApp.url?.length),
            );
            console.log(" webApp");
            payLoad = { type: "webApp", data: pApp.url || payLoad.link };
          }
        }
      } else {
        processedPayload = {
          type: "emptyObject",
          message: "pApp is an empty object",
        };
        console.log("pApp is an empty object.  No specific action taken.");
      }
    }
    if (processedPayload.type === "unknown") {
      console.log(processedPayload.type === "unknown");
      console.log(" unknown");
      payLoad = JSON.stringify(processedPayload.message);
    } else if (processedPayload.type === "jsonData") {
      console.log(processedPayload.type === "jsonData");
      console.log(" jsonData");
      payLoad = processedPayload.data;
    } else if (processedPayload.type === "htmlDoc") {
      console.log(processedPayload.type === "htmlDoc");
      console.log(" htmlDoc");
      payLoad = processedPayload.data;
    } else if (processedPayload.type === "error") {
      console.log(processedPayload.type === "error");
      console.log(" error");
      payLoad = processedPayload.message;
    } else if (processedPayload.type === "text") {
      console.log(processedPayload.type === "text");
      console.log(" text");
      payLoad = processedPayload.data;
    } else if (
      processedPayload.type === "object" &&
      processedPayload.data !== null
    ) {
      console.log(processedPayload.type === "object");
      console.log(" object");
      var appLTic = processedPayload.data;
      if (appLTic["app"]) {
        console.log(appLTic["app"]);
        console.log(" app");
        payLoad = appLTic["app"];
      } else if (appLTic["error"]) {
        console.log(appLTic["error"]);
        console.log(" error");
        payLoad = JSON.stringify(appLTic["details"]);
      } else if (appLTic["myVar"]) {
        console.log(appLTic["myVar"]);
        console.log(" myVar");
        var whappVar = appLTic["myVar"];
        try {
          const htmlDoc = XmlService.parse(whappVar);
          const rootElement = htmlDoc.getRootElement(); // Get root
          if (!rootElement || rootElement.getName() !== "html") {
            throw new Error(
              "Not a valid HTML document (no <html> tag or invalid structure).",
            );
          }
          payLoad = whappVar;
        } catch (htmlError) {
          console.log("HTML Parse Error: " + htmlError + ", Input: " + pApp);
          payLoad = JSON.stringify(whappVar);
        }
      } else if (appLTic["url"]) {
        console.log(appLTic["url"]);
        console.log(" url");
        payLoad = { type: "url", data: appLTic["url"] };
      } else {
        console.log(processedPayload.type === "object");
        console.log(" object");
        if (Array.isArray(appLTic)) {
          payLoad = JSON.stringify(appLTic);
        } else {
          if (typeof appLTic.getContent === "function") {
            try {
              // Do NOT set payLoad here if appLTic is an HtmlOutput (has getContent)
              payLoad = null;
              console.log(
                "appLTic is an HtmlOutput. Skipping payLoad assignment.",
              );
            } catch (templateError) {
              console.log(
                "Html Service Error: " + templateError + ", Input: " + appLTic,
              );
              payLoad = JSON.stringify(appLTic);
            }
          } else {
            console.log("Last resort:", payLoad);
            payLoad = null;
          }
        }
      }
    } else if (processedPayload.type === "emptyObject") {
      console.log(processedPayload.type === "emptyObject");
      console.log(" emptyObject");
      payLoad = processedPayload.message;
    }
  } catch (error) {
    console.error(`Error executing function "${funcUno}":`, error);
    payLoad = {
      type: "error",
      message: "Function execution failed.",
      error: error.message,
    };
  }
  if (payLoad && payLoad.type) {
    var postProcessedPayload = payLoad.type;
    var errMsgData = payLoad.error;
    var vData = payLoad.data;
    if (postProcessedPayload["webApp"] || postProcessedPayload["url"]) {
      console.log(postProcessedPayload["webApp"]);
      console.log(" webApp");
      payLoad = { app: vData };
    } else if (postProcessedPayload["client"]) {
      console.log(postProcessedPayload["client"]);
      console.log(" client");
      payLoad = { vApp: vData };
    } else {
      console.log(payLoad && payLoad.type);
      console.log("error message data");
      payLoad = errMsgData;
    }
  }
  console.log("The final value of payLoad. ", payLoad);

  var foobarr = funcUno || "renderFile";
  var libFunc = foobarr;
  var htmlArray = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS Section3.Challenge1 cors edgarFriendly editor ssForms styling theRoll theWorks uiAccess cGWI`,
  ]
    .toString()
    .split(" ");
  var rndPage =
    htmlArray[Math.floor(Math.random() * Math.floor(htmlArray.length))];
  var index = htmlArray.findIndex(function (element) {
    if (Array.isArray(e.parameter["args"])) {
      return element === e.parameter["args"][0];
    } else {
      return element === e.parameter["args"];
    }
  });
  var tres = htmlArray.findIndex(function (element) {
    return element === funcTres;
  });
  console.log("index:", index + "\ntres", tres);
  var args = index !== -1 ? [htmlArray[index]] : ["theWorks"]; //simplified
  console.log("e {parameter: {func: " + e.parameter["func"] + "}}");
  let templateName = e.parameter["func"];
  if (e.parameter["func"] === "crmGWI") {
    templateName = "General Work Invoice";
  } else if (e.parameter["func"] === "crmEBI") {
    templateName = "Employee Benefits Inquiry";
  }

  if (
    this[libName] &&
    typeof this[libName][e.parameter["func"]] === "function"
  ) {
    try {
      return renderTemplate(
        `<!DOCTYPE html>
                    <html id="wildSageBrushDoGet">
                    <head>
                      <base target="_self">
                      <meta charset="utf-8">
                      <meta name="Subscribe" content="Pro Media Snip">
                      <meta name=viewport content="width=device-width, initial-scale=1">
                      <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
                      <style>
    
                          body {
    
                            flex-grow: 1;
                            color:blue;
                            text-decoration:bold;
                            flex-flow: row wrap;
                            grid-column: 1;
                            grid-row: 1;
                            text-align: center;
                            align-content: flex-start;
                            overflow: auto;
                          }
                      </style>
                    </head>
                    <body>
                      <div id="pageObj"></div>
                  <textarea id="jsonInput" style="display: none;width: 80%;min-height: 200px;margin:10px auto;padding:10px;border:1px solid #ccc;font-family:monospace;white-space:pre-wrap;text-align:left;"></textarea>
                  <div>
                        <?!= renBlob ?>
                      </div>
                    </body>
                      <script>;
      function serverSide(func, args) {
        return new Promise((resolve, reject) => {
          google.script.run
            .withSuccessHandler((result) => {
              resolve(result);
            })
            .withFailureHandler((error) => {
              console.log(error);
              console.log(document.getElementById("test").innerHTML);
              reject(error);
            })
            .runBoilerplate(func, args)
        }); 
      };
      var objUrl 
      = document.getElementById("pageObj");var jsonInput 
      = document.getElementById("jsonInput");var currentE 
      = <?= e ?>;document.addEventListener("DOMContentLoaded", eRun)
      function eRun() {
        objUrl.innerHTML 
      = <?= JSON.stringify(e) ?>;jsonInput.style.display 
      = "block";jsonInput.value 
      = <?= JSON.stringify(e, null, 2) ?>};
      jsonInput.addEventListener("change", function() {
        try {
          var parsedE 
      = JSON.parse(jsonInput.value);alert("e object updated (check the console). You would now typically send this back to the server.");console.log("Updated e object:", parsedE);serverSide(parsedE.parameter["func"], [parsedE.parameter["args"]]).then(validationResult => {
        console.log("Actual validation result: " + JSON.stringify(validationResult));
      if (validationResult.app) {
        alert("e object validated successfully on the server");currentE 
      = parsedE;var textRes 
      = <?= homePage ?> + "?func=" + currentE.parameter["func"] + "&args=" + currentE.parameter["args"];window.open(textRes);
      }
      else {
        alert("Server validation failed: Unknown error");console.error("Server validation failed:", validationResult);//give parameter feedback
      }}).catch(error => {
        if (parsedE.parameter["action"]) {
          alert("e object action required on the server");currentE 
          = parsedE;var textRes 
          = <?= homePage ?> + "?action=" + currentE.parameter["action"] + "&func=" + currentE.parameter["func"] + "&args=" + parsedE.parameter["args"];window.open(textRes);
        }
          alert("Error during server validation: " + error);console.error("Server validation error:", error)
        });
      }
        catch(error) {
          alert("Error parsing JSON. Please ensure the input is valid JSON.");console.error("JSON parsing error:", error);
        };
      });
      </script>
    </html>`,
        {
          renBlob: this[libName].contentApp(
            `
          <!DOCTYPE html>
          <html id="renderTemplate_blob" lang="en">
            <head>
              <base target="_self">
              <meta charset="utf-8">
              <meta name="doGet" content="Budget get Function">
              <meta name=viewport content="width=device-width, initial-scale=1">
              <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
              <style>
    
                  body {
    
                    flex-grow: 1;
                    color:blue;
                    text-decoration:bold;
                    flex-flow: row wrap;
                    grid-column: 1;
                    grid-row: 1;
                    text-align: center;
                    align-content: flex-start;
                    overflow: auto;
                  }
              </style
            </head>
            <body>
              <div id="coApp" style='display:"block"'><?!= typeof HtmlService.createHtmlOutput(appL).getContent() === "undefined" || typeof appL["app"] === "object" || typeof appL["vApp"] === "object" ? Object.values(appL).join(" ") : HtmlService.createTemplate(appL).evaluate().getContent() ?></div>
              <div class="container">
                <?!= HtmlService.createTemplateFromFile(tupL).evaluate().getContent() ?>
              </div>
              <div id="indexDiv" class="row responsive-section" style='display: "none"'>
                <div class="col s12 l12 m12 card-panel container push-l1" style="background-color: #ffc107;">
                  <div class="">
                      <iframe 
                        class="z-depth-5 card-panel deep-purple darken-1 scale-transition scale-out scale-in btn-large" 
                        src='<?= appL["app"] ? (appL["app"] || appL["vApp"]) : "https://www.clubhouse.com/@fabianlewis?utm_medium=ch_profile&utm_campaign=lhTUtHb2bYqPN3w8EEB7FQ-247242" ?>'
                        id="indexBeta"
                        style="width:100%;height:50vh;border:0"
                        allow="autoplay"
                        allow="encrypted-media"
                        title="Dontime Life Website"
                        frameborder="0"
                       allowfullscreen
                        ></iframe>
                  </div>
                </div>
              </div>
              <div id="feedDiv" class="row responsive-section" style='display:"block"'>
                <div class="col s12 l12 m12 card-panel container push-l1" id="appLApp" style="background-color: #ffc107;"><?!= typeof HtmlService.createHtmlOutput(appL).getContent() === "undefined" ? JSON.stringify(JSON.parse([appL])[Math.floor(Math.random() * (Math.floor(JSON.parse([appL]).length)))]) : Object.values(appL).join(" ") ?></div>
              </div>
              <script>
                this.window.onload = function() {
                var frameD = document.getElementById("indexBeta").src;
                document.getElementById("indexDiv").style.display = frameD? "block":"none"
              };</script>
            </body>
          </html>`,
            {
              appL:
                payLoad ||
                this[libName][
                  foobarr ||
                    HtmlService.createHtmlOutput(
                      `
          <html id="appL_func">
            <head>
              <base target="_self">
              <meta charset="utf-8">
              <meta name="doGet" content="Company get Function">
              <meta name=viewport content="width=device-width, initial-scale=1">
              <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
            </head>
            <body>
              <script>
                document.getElementById("appList").value
              </script>
            </body>
          </html>
                  `,
                    ).getContent()
                ].apply(this, [
                  e.parameter["args"] ||
                    args ||
                    HtmlService.createHtmlOutput(
                      `
                  
          <html id="appL_args">
            <head>
              <base target="_self">
              <meta charset="utf-8">
              <meta name="doGet" content="Company get Function">
              <meta name=viewport content="width=device-width, initial-scale=1">
              <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
            </head>
            <body>
              <script>
                document.getElementById("username").value
              </script>
            </body>
          </html>
                  `,
                    ).getContent(),
                ]),
              tupL: htmlArray[tres] || args,
            },
          ),
          e: e,
          homePage: this[libName].getScriptUrl(),
        },
      );
    } catch (error) {
      console.error(
        `Error executing function "${e.parameter["func"]}":`,
        error,
      );
      return "Error executing function.";
    }
  } else {
    return;
  }
};

var doPost = function (e) {
  var libName = "App";
  try {
    if (e && e.parameter && e.parameter.action === "submitForm") {
      var formData = JSON.parse(e.postData.contents);
      MailApp.sendEmail({
        to: "promanual-support@googlegroups.com",
        subject: "New Form Submission",
        body: JSON.stringify(formData),
      });
      return this[libName].handleRequest(e);
    }
  } catch (error) {
    console.error("Error in doPost:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error processing form submission: " + error.message,
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
  return; // Or a default response if needed
};

var runBoilerplate = function (func, args) {
  var libName = "App";
  var libFunc = func || "doGet";
  args = args || [];
  return this[libName][libFunc].apply(this, args);
};

var runAll = function (func, args) {
  var arr = func.split(".");
  var libName = arr[0];
  var libFunc = arr[1];
  args = args || [];
  return this[libName][libFunc].apply(this, args);
};
