(function () {
    "use strict";

    jQuery.sap.declare("acm.trcon.excel.zacmexcelupload1.utils.library");

    // delegate further initialization of this library to the Core
    sap.ui.getCore().initLibrary({
        name: "acm.trcon.excel.zacmexcelupload1.utils",
        noLibraryCSS: true
    });

    delete window.define; //sap.viz leaves it and xlsx don't work

    sap.ui.define(
        //module name
        "acm/trcon/excel/zacmexcelupload1/utils",
        // node module path
        ["acm/trcon/excel/zacmexcelupload1/mylibrary/xlsx"],
        // callback
        function () {
            return window.xlsx;
        });

})();
