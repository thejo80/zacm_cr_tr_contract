/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["acm/trcon/excel/zacmexcelupload1/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
