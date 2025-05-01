var doGet = function (e) {
  var libName = "App";
  if (e && e.parameter && e.parameter.action === "getData") {
    return this[libName].handleRequest(e);
  }
  if (e && e.parameter["file"]) {
    var funcTres = e.parameter["file"];
  } else {
    var funcTres = "uiAccess";
  }
  if (e && e.parameter["func"]) {
    console.log(JSON.stringify(e));
  } else {
    var argsEd = this[libName].testlt();
    if (typeof this[libName].mis === "function") {
      if (typeof argsEd === "string") {
        e = this[libName].objectOfS(
          ["parameter"],
          [
            [
              ["func", "mis"],
              ["args", argsEd],
            ],
          ],
          Math.floor(
            (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
          ),
        );
      } else if (typeof argsEd === "object" && argsEd !== null && argsEd.name) {
        if (argsEd.parameters && argsEd.parameters.length > 0) {
          e = this[libName].objectOfS(
            ["parameter"],
            [
              [
                ["func", "mis"],
                ["args", [argsEd.name, ...argsEd.parameters]],
              ],
            ],
            Math.floor(
              (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
            ),
          );
        } else {
          e = this[libName].objectOfS(
            ["parameter"],
            [
              [
                ["func", "mis"],
                ["args", argsEd.name],
              ],
            ],
            Math.floor(
              (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
            ),
          );
        }
      } else {
        console.log("Unexpected argsEd type: ", argsEd);
        e = this[libName].objectOfS(
          ["parameter"],
          [
            [
              ["func", "mis"],
              ["args", "Invalid Entry"],
            ],
          ],
          Math.floor(
            (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
          ),
        );
      }
      console.log(JSON.stringify(e));
    }
  }
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
  var args;
  index !== -1 ? (args = [htmlArray[index]]) : (args = ["theWorks"]);
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
        `<html id="wildSageBrushDoGet">
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
      };var objUrl 
      = document.getElementById("pageObj");var jsonInput 
      = document.getElementById("jsonInput");var currentE 
      = <?= e ?>;document.addEventListener("DOMContentLoaded", eRun)
      function eRun() {
        objUrl.innerHTML 
      = <?= JSON.stringify(e) ?>;jsonInput.style.display 
      = "block";jsonInput.value 
      = <?= JSON.stringify(e, null, 2) ?>
      };
      jsonInput.addEventListener("change", function() {
        try {
          var parsedE 
      = JSON.parse(jsonInput.value);alert("e object updated (check the console). You would now typically send this back to the server.");console.log("Updated e object:", parsedE);serverSide(parsedE.parameter["func"], [parsedE.parameter["args"]]).then(validationResult => {
        console.log("Actual validation result: " + validationResult);
      if (validationResult.app) {
        alert("e object validated successfully on the server");currentE 
      = parsedE;var textRes 
      = <?= homePage ?> + "?func=" + currentE.parameter["func"] + "&args=" + currentE.parameter["args"];window.open(textRes);
      }
      else {
        alert("Server validation failed: Unknown error");console.error("Server validation failed:", validationResult);//give parameter feedback
      }}).catch(error => {
          alert("Error during server validation: " + error);console.error("Server validation error:", error)
        });
      }
        catch(error) {
          alert("Error parsing JSON. Please ensure the input is valid JSON.");console.error("JSON parsing error:", error);
        };
      });</script>
    </html>`,
        {
          renBlob: this[libName].contentApp(
            `          
          <html id="renderTemplate_blob">
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
              <div id="coApp">
                <?= JSON.stringify(appL["index"]) ?>
              </div>
              <div class="container">
                <?!= HtmlService.createTemplateFromFile(tupL).evaluate().getContent() ?>
              </div>
              <div class="row">
                <div class="col s12 l12 m12 card-panel responsive-section" style="background-color: #ffc107;">
                  <div class="container"> 
                      <iframe 
                        class="z-depth-5 card-panel deep-purple darken-1 scale-transition scale-out scale-in btn-large" 
                        src=""
                        id="indexBeta"
                        style="
                          width: 100%;
                          height: 50vh"
                        allow="autoplay"
                        allow="encrypted-media"
                        title="Dontime Life Website"
                        frameborder="0"
                        allowfullscreen
                        ></iframe>
                  </div>
                </div>
              </div>
              <div class="responsive-section">
                <div class="container">
                  <?!= typeof appL === "object" && typeof appL["app"] !== "string" ? JSON.stringify(appL["app"]):"" ?>
                </div>
              </div>
              <script>
                if (<?!= appL && typeof appL === "object" && typeof appL["app"] !== "undefined" && typeof appL["app"] === "string" ?>) {
                  console.log(<?!= appL["app"].length ?>);
                  if (<?!= appL["app"].length === 83 || appL["app"].length === 94 || appL["app"].length === 97 || appL["app"].length === 99 || appL["app"].length === 101 || appL["app"].length === 103 || appL["app"].length === 136 || appL["app"].length === 132 ?>) {
                    document.getElementById("indexBeta").src 
                  = <?= appL["app"] ?>
                }
                  else {
                    document.getElementById("coApp").innerHTML 
                  = <?!= XmlService.getPrettyFormat().format(XmlService.parse(appL["app"]).getRootElement().getChild("body")) ?>;document.getElementById("indexBeta").src 
                  = <?= appL["index"] ?>
                }
              }
                else {
                  document.getElementById("indexBeta").src 
                = "https://www.clubhouse.com/@fabianlewis?utm_medium=ch_profile&utm_campaign=lhTUtHb2bYqPN3w8EEB7FQ-247242";
              }</script>
            </body>
          </html>`,
            {
              appL: this[libName][
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
