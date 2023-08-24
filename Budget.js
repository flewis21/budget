var doGet = function (e) {
  var foobarr = e.parameter["func"] || "renderFile";
  var libName = "App";
  var libFunc = foobarr;
  var rndPage = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS`,
  ]
    .toString()
    .split(" ")[
    Math.floor(
      Math.random() *
        Math.floor(
          [
            `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS`,
          ]
            .toString()
            .split(" ").length,
        ),
    )
  ];
  args = e.parameter["args"] || ["jFundamentals"];
  return renderTemplate(
    this[libName].contentApp(`<?!= appL ?>`, {
      appL: this[libName][
        foobarr ||
          HtmlService.createHtmlOutput(
            `
              <script>
                document.getElementById("appList").value
              </script>
              `,
          ).getContent()
      ].apply(this, [
        args ||
          HtmlService.createHtmlOutput(
            `
              <script>
                document.getElementById("username").value
              </script>
              `,
          ).getContent(),
      ]),
    }),
    { e: e },
  );
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
