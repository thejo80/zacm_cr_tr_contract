/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"acmtrconexcel/zacm_excel_upload/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
