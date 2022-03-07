sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessagePopover",
    "sap/m/MessagePopoverItem",
    "sap/ui/export/Spreadsheet",
    "acm/trcon/excel/zacmexcelupload1/model/models",
], function (Controller, JSONModel, MessageToast, MessagePopover, MessagePopoverItem, Spreadsheet, models) {
    "use strict";

    return Controller.extend("acm.trcon.excel.zacmexcelupload1.controller.createtrcontract", {
        onInit: function () {

            var oTableModel = new JSONModel();
            oTableModel.setData({
                "LogTable": [{
                    "type": "",
                    "message": "",
                    "TradingContractType": "",
                    "ExternalReference": ""
                }]
            });

            //set LogTable model
            this.getView().byId("idLogTable").setModel(oTableModel, "TableModel");

            //this.oRouter = this.getOwnerComponent().getRouter();

            // create a default model
            var formModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(formModel, "formModel");

            // set i18n model on view
            /*var i18nModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "acm.trcon.excel.zacmexcelupload1.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");*/

            debugger;
            MessageToast.show("Please select excel file and click on Upload button to create Trading Contracts", {
                duration: 10000
            });

        },
        onPressUpload: function (oEvent) {

            //Handle excel file
            this.handleUploadPress(oEvent);

        },
        mapping: function () {

            //get Contarct Type
            var oRd1 = this.getView().byId("idRd1").getSelected();
            var oRd2 = this.getView().byId("idRd2").getSelected();

            debugger;
            //Check for 'Purchase', set payload accordingly 
            if (oRd1 === true) {
                var payload = {
                    "TradingContractType": "AC3P",
                    "MntnContractHeader": []
                };
            } else if (oRd2 === true) {
                var payload = {
                    "TradingContractType": "AC3S",
                    "MntnContractHeader": []
                };
            }

            //access the local model which is pertaining to our view
            //var createTrConPayload = this.getView().getModel("formModel").oData.excelData;
            var createTrConPayload = this.getView().getModel("formModel").getProperty("/excelData");

            debugger;
            for (var i = 0; i < createTrConPayload.length; i++) {
                var oEntry = {};
                if (createTrConPayload[i].TradingContractType != undefined) {

                    //Header Details                
                    oEntry.CompanyCode = createTrConPayload[i].CompanyCode;
                    oEntry.TradingContractNumber = "$01";
                    oEntry.IncotermLocation1 = createTrConPayload[i].IncotermLocation1;
                    oEntry.PurchasingOrganization = createTrConPayload[i].PurchasingOrganization;
                    oEntry.PurchasingGroup = createTrConPayload[i].PurchasingGroup;
                    oEntry.SalesOrganization = createTrConPayload[i].SalesOrganization;
                    oEntry.DistributionChannel = createTrConPayload[i].DistributionChannel;
                    oEntry.Division = createTrConPayload[i].Division;
                    oEntry.Side = createTrConPayload[i].Side;
                    oEntry.TradingContractType = createTrConPayload[i].TradingContractType;
                    oEntry.Counterparty = createTrConPayload[i].Counterparty;
                    oEntry.CounterpartyType = createTrConPayload[i].CounterpartyType;
                    oEntry.PaymentTerm = createTrConPayload[i].PaymentTerm;
                    oEntry.Incoterms = createTrConPayload[i].Incoterms;
                    oEntry.Currency = createTrConPayload[i].Currency;
                    oEntry.ExternalReference = createTrConPayload[i].ExternalReference;
                    oEntry.TraderId = createTrConPayload[i].TraderId;
                    oEntry.SalesOrganization = createTrConPayload[i].SalesOrganization;
                    oEntry.IncotermsLocation2 = createTrConPayload[i].IncotermsLocation2;

                    //
                    if (createTrConPayload[i].VehicleContract != undefined) {
                        oEntry.VehicleContract = true;
                    } else {
                        oEntry.VehicleContract = false;
                    }

                    //
                    if (createTrConPayload[i].SignedStatus != undefined) {
                        oEntry.SignedStatus = true;
                    } else {
                        oEntry.SignedStatus = false;
                    }

                    //
                    if (createTrConPayload[i].CreditSale != undefined) {
                        oEntry.CreditSale = true;
                    }
                    else {
                        oEntry.CreditSale = false;
                    }

                    //
                    if (createTrConPayload[i].IsTradeOfficeChanged != undefined) {
                        oEntry.IsTradeOfficeChanged = true;
                    } else {
                        oEntry.IsTradeOfficeChanged = false;
                    }

                    debugger;
                    //Item
                    oEntry.MntnContractItem = [];
                    var MntnContractItem = {};
                    MntnContractItem.ContractType = createTrConPayload[i].TradingContractType;
                    MntnContractItem.CounterParty = createTrConPayload[i].Counterparty;
                    MntnContractItem.PurchaseOrg = createTrConPayload[i].PurchasingOrganization;
                    MntnContractItem.Side = createTrConPayload[i].Side;
                    MntnContractItem.PricingApproach = "FB"; //createTrConPayload[i].PricingApproach;
                    MntnContractItem.TradingContractNumber = "$01";
                    MntnContractItem.TradingContractItem = "000010";
                    MntnContractItem.Material = createTrConPayload[i].Material;
                    MntnContractItem.PlantName = createTrConPayload[i].PlantName;
                    MntnContractItem.OrderQuantity = createTrConPayload[i].OrderQuantity;
                    MntnContractItem.OrderUnit = createTrConPayload[i].OrderUnit;
                    MntnContractItem.NumberOfVehicles = createTrConPayload[i].NumberOfVehicles;
                    MntnContractItem.ValuationPoint = createTrConPayload[i].ValuationPoint;
                    MntnContractItem.DiscPremQtyScheduleUniqueID = createTrConPayload[i].DiscPremQtyScheduleUniqueID;
                    MntnContractItem.DiscPremQtyScheduleName = createTrConPayload[i].DiscPremQtyScheduleName;
                    MntnContractItem.DiscPremQtyScheduleVersion = createTrConPayload[i].DiscPremQtyScheduleVersion;
                    MntnContractItem.DiscPremQtySchedValdtyVersion = createTrConPayload[i].DiscPremQtySchedValdtyVersion;
                    MntnContractItem.DiscPremQtyOvrdTiming = createTrConPayload[i].DiscPremQtyOvrdTiming;
                    MntnContractItem.DiscPremQtyOvrdGovTerm = createTrConPayload[i].DiscPremQtyOvrdGovTerm;
                    MntnContractItem.DiscPremQtyOvrdGovWeightCode = createTrConPayload[i].DiscPremQtyOvrdGovWeightCode;
                    MntnContractItem.DiscPremQtyOvrdGovAnalysisCode = createTrConPayload[i].DiscPremQtyOvrdGovAnalysisCode;
                    MntnContractItem.DiscPremQtyScheduleOverride = createTrConPayload[i].DiscPremQtyScheduleOverride;
                    MntnContractItem.ACMTrdgContrToleranceSchedule = createTrConPayload[i].ACMTrdgContrToleranceSchedule;
                    MntnContractItem.ACMToleranceTypeID = createTrConPayload[i].ACMToleranceTypeID;
                    MntnContractItem.ACMToleranceDeliveryQuantity = createTrConPayload[i].ACMToleranceDeliveryQuantity;
                    MntnContractItem.UnitOfMeasure = createTrConPayload[i].UnitOfMeasure;
                    MntnContractItem.CommoditySubAccountId = createTrConPayload[i].CommoditySubAccountId;
                    MntnContractItem.CommoditySubAccountName = createTrConPayload[i].CommoditySubAccountName;
                    MntnContractItem.CommoditySubAccountIdMirror = createTrConPayload[i].CommoditySubAccountIdMirror;

                    //Booleans
                    if (createTrConPayload[i].PriceChanged != undefined) {
                        MntnContractItem.PriceChanged = true;
                    } else {
                        MntnContractItem.PriceChanged = false;
                    }

                    //
                    if (createTrConPayload[i].CancPerformed != undefined) {
                        MntnContractItem.CancPerformed = true;
                    } else {
                        MntnContractItem.CancPerformed = false;
                    }

                    //
                    if (createTrConPayload[i].CreditSaleInd != undefined) {
                        MntnContractItem.CreditSaleInd = true;
                    } else {
                        MntnContractItem.CreditSaleInd = false;
                    }

                    //
                    if (createTrConPayload[i].IsCrSaleIndEditable != undefined) {
                        MntnContractItem.IsCrSaleIndEditable = true;
                    } else {
                        MntnContractItem.IsCrSaleIndEditable = false;
                    }

                    //
                    if (createTrConPayload[i].ACMTolSingleOverFillIsAllowed != undefined) {
                        MntnContractItem.ACMTolSingleOverFillIsAllowed = true;
                    } else {
                        MntnContractItem.ACMTolSingleOverFillIsAllowed = false;
                    }

                    //
                    if (createTrConPayload[i].AtUnloadLoc != undefined) {
                        MntnContractItem.AtUnloadLoc = true;
                    } else {
                        MntnContractItem.AtUnloadLoc = false;
                    }

                    //
                    if (createTrConPayload[i].DiscPremQtyScheduleOverride != undefined) {
                        MntnContractItem.DiscPremQtyScheduleOverride = true;
                    } else {
                        MntnContractItem.DiscPremQtyScheduleOverride = false;
                    }

                    //Dates
                    debugger;
                    MntnContractItem.DateFrom = this.prepareDate(createTrConPayload[i].DateFrom);
                    MntnContractItem.DateTo = this.prepareDate(createTrConPayload[i].DateTo);
                    MntnContractItem.PaymentDate = this.prepareDate(createTrConPayload[i].PaymentDate)

                    //MntnContractItem.DateFrom = "\/Date(1643673600000)\/";       //createTrConPayload[i].DateFrom;
                    //MntnContractItem.DateTo = "\/Date(1646006400000)\/";         //createTrConPayload[i].DateTo;
                    //MntnContractItem.PaymentDate = "\/Date(1640908800000)\/";    //createTrConPayload[i].PaymentDate;

                    oEntry.MntnContractItem.push(MntnContractItem);

                    //Optionality
                    oEntry.MntnContractItem[0].MntnContrOptionDetail = [];
                    var MntnContrOptionDetail = {};
                    MntnContrOptionDetail.TradingContractNumber = "$01";
                    MntnContrOptionDetail.TradingContractItem = "000010";
                    MntnContrOptionDetail.ACMTradingContractOptionsType = createTrConPayload[i].OptionType;
                    MntnContrOptionDetail.ACMContractOptionsCropSeasonID = createTrConPayload[i].CropSeason;
                    oEntry.MntnContractItem[0].MntnContrOptionDetail.push(MntnContrOptionDetail);

                    //Sales, add 'Related Contract'
                    if (oRd2 === true) {
                        debugger;
                        oEntry.MntnContractItem[0].MntnContrRelatedTradesDet = [];
                        var MntnContrRelatedTradesDet = {};
                        MntnContrRelatedTradesDet.TradingContractNumber = "$01";
                        MntnContrRelatedTradesDet.TradingContractItem = "000010";
                        MntnContrRelatedTradesDet.RelatedTradeType = createTrConPayload[i].RelatedTradeType;
                        MntnContrRelatedTradesDet.ExtReferenceIdentifier = createTrConPayload[i].ExternalIDRelTrade;
                        MntnContrRelatedTradesDet.GtmTradingContract = createTrConPayload[i].GTMRelTrade;
                        MntnContrRelatedTradesDet.RelatedTradeDescription = createTrConPayload[i].RelTypeText;
                        MntnContrRelatedTradesDet.Quantity = createTrConPayload[i].RelTypeQty;
                        MntnContrRelatedTradesDet.UnitOfMeasure = createTrConPayload[i].RelTypeUnit;
                        oEntry.MntnContractItem[0].MntnContrRelatedTradesDet.push(MntnContrRelatedTradesDet);
                    }

                    //Pricing Lot Header Details
                    oEntry.MntnContractItem[0].MntnContractPriceLot = [];
                    var MntnContractPriceLot = [];
                    MntnContractPriceLot =
                    {
                        "FlatPrice": "9.700000",
                        "PriceUnit": "1",
                        "CondUom": "BU",
                        "FlatCurr": "USD",
                        "UxFcQtyAddress": 1,
                        "PaymentTerm": "0001",
                        "FutureCurr": "USD",
                        "PrcAppDesc": "Componentized",
                        "BasisCurr": "USD",
                        "TradingContractType": "AC3P",
                        "Currency": "USD",
                        "Mic": "CBOT",
                        "PrcApproach": "FB",
                        "FuturePrice": "10.000000",
                        "CounterParty": "MAGR17B002",
                        "Material": "MAGR_SOYBEANS_02",
                        "BasisPrice": "-0.300000",
                        "TradingContractNumber": "$01",
                        "TradingContractItem": "10",
                        "PrcQty": "15000",
                        "Uom": "BU",
                        "DcsId": "CBOTZS",
                        "DcsDesc": "SOYBEANS CBOT ZS",
                        "MicDesc": "Chicago Board of Trade",
                        "MatKeyDate": "\/Date(1647216000000)\/",
                        "MaturityCode": "ZSH22",
                        "IntPriceType": "NUL",

                        "MntnContractPriceCond": [{
                            "Side": "P",
                            "DcsId": "CBOTZS",
                            "IsFixTermDisable": true,
                            "Status": "Unpriced",
                            "CommUom": "BU",
                            "PriceType": "05",
                            "TradingContractNumber": "$01",
                            "UnitOfMeasure": "BU",
                            "PriceUnit": "1",
                            "TradingContractItem": "10",
                            "CondtionType": "ACFT",
                            "CondtionTypeText": "ACM Futures price",
                            "Amount": "12.99",
                            "DocCurrency": "USD",
                            "MarketCurrency": "USD"
                        }, {
                            "BasisId": "D_17A2_SY_SB",
                            "Side": "P",
                            "DcsId": "CBOTZS",
                            "IsFixTermDisable": true,
                            "Status": "Unpriced",
                            "CommUom": "BU",
                            "PriceType": "03",
                            "IsBasis": true,
                            "TradingContractNumber": "$01",
                            "UnitOfMeasure": "BU",
                            "PriceUnit": "1",
                            "TradingContractItem": "10",
                            "CondtionType": "ACBS",
                            "CondtionTypeText": "ACM Basis price",
                            "Amount": "-3.1",
                            "DocCurrency": "USD",
                            "MarketCurrency": "USD"
                        }]
                    };

                    //oEntry.MntnContractItem[0].MntnContractPriceLot.push(MntnContractPriceLot);

                    //Pricing Lot Condition Details
                    //oEntry.MntnContractItem[0].MntnContractPriceLot[0].MntnContractPriceCond[0]

                    if (oEntry != undefined) {
                        debugger;
                        payload.MntnContractHeader.push(oEntry);
                    }
                }
            }
            debugger;
            //post call
            this.post(payload);
        },

        post: function (payload) {
            debugger;
            var oLogTable = this.getView().byId("idLogTable").getModel("TableModel").oData;
            if (oLogTable != undefined) {
                var oTableModel = this.getView().byId("idLogTable").getModel("TableModel");
                var arrayClear = [];
                oTableModel.setProperty("/LogTable", arrayClear);
            }
            //POST method
            var that = this;
            this.oDataModel = this.getView().getModel();
            //payload = this.getView().getModel("formModel").oData.formdata;
            this.oDataModel.create("/ContractLoadSet", payload, {
                success: function (odata, response) {
                    debugger;
                    //prepare log
                    for (var i = 0; i < response.data.MntnContractHeader.results.length; i++) {
                        var headerlog = JSON.parse(response.headers["sap-message"]);
                        var detailedLog = headerlog.details;
                        var message = detailedLog[i].message;
                        var msgType = detailedLog[i].severity;
                        var LogData = {
                            "type": msgType,
                            "message": message,
                            "TradingContractType": response.data.MntnContractHeader.results[i].TradingContractType,
                            "ExternalReference": response.data.MntnContractHeader.results[i].ExternalReference
                        };
                        var oTableModel = that.getView().byId("idLogTable").getModel("TableModel");
                        var array = oTableModel.getProperty("/LogTable");
                        array.push(LogData);
                    }
                    oTableModel.setProperty("/LogTable", array);

                    //set log table    
                    that.getView().byId("idLogTable").setModel(oTableModel, "TableModel");
                },
                error: function (oError) {
                    debugger;
                    var eTab = JSON.parse(oError.responseText);
                    var message = eTab.error.message.value
                        ;
                    var LogData = {
                        "type": "error",
                        "message": message,
                        "TradingContractType": "",
                        "ExternalReference": ""
                    };

                    /*for (var i = 0; i < eTab.error.innererror.errordetails.length; i++) {
                        var message = eTab.error.innererror.errordetails[i].message;
                        var msgType = eTab.error.innererror.errordetails[i].severity;
                        var LogData = {
                            "type": msgType,
                            "message": message,
                            "TradingContractType": "",
                            "ExternalReference": ""
                        };
                    }*/
                    //
                    /*if (eTab.error.innererror.errordetails.length === 0) {
                        message = eTab.error.message.value;
                        var LogData = {
                            "type": "error",
                            "message": message,
                            "TradingContractType": "",
                            "ExternalReference": ""
                        };
                    }*/
                    var oTableModel = that.getView().byId("idLogTable").getModel("TableModel");
                    var array = oTableModel.getProperty("/LogTable");
                    array.push(LogData);

                    oTableModel.setProperty("/LogTable", array);

                    //set log table    
                    that.getView().byId("idLogTable").setModel(oTableModel, "TableModel");

                }
            });
        },

        handleUploadPress: function (oEvent) {

            //clear message log
            var oTableModel = this.getView().byId("idLogTable").getModel("TableModel");
            var array = oTableModel.getProperty("/LogTable");
            array = [];
            oTableModel.setProperty("/LogTable", array);

            var oFileUploader = this.getView().byId("idFileUploader");
            var domRef = oFileUploader.getFocusDomRef();
            var selectedFile = domRef.files[0];
            if (domRef.files[0].size === 0) {
                return;
            }

            //XLSX
            if (selectedFile) {
                debugger;
                let fileReader = new FileReader();
                fileReader.readAsBinaryString(selectedFile);
                //ExporteReader.readAsBinaryString(selectedFile);
                var that = this;
                fileReader.onload = (event) => {
                    debugger;
                    let data = event.target.result;
                    let workbook = XLSX.read(data, {
                        type: "binary"
                    });
                    //console.log(workbook);
                    workbook.SheetNames.forEach(sheet => {
                        let rowobject =
                            XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                        //console.log(rowobject);
                        //set model for OData service
                        that.getView().getModel("formModel").setProperty("/excelData", rowobject);
                        //Mapping & POST method
                        that.mapping();
                    });
                }
            }
            //});

            //CSV
            /*if (selectedFile) {
                var reader = new FileReader();
                var that = this;
                reader.onload = function (e) {
                    debugger;
                    var arrCSV = e.currentTarget.result.split("\r\n");
                    var headerRow = arrCSV[0].split(',');
                    var data = [];
                    for (var i = 1; i < arrCSV.length; i++) {
                        var record = {};
                        var excelData = arrCSV[i].split(',');
                        for (var j = 0; j < excelData.length; j++) {
                            record[headerRow[j]] = excelData[j].trim();
                        }
                        data.push(record);
                    }
                    //set model for OData service
                    that.getView().getModel("formModel").setProperty("/excelData", data);
                    //Mapping & POST method
                    that.mapping();
                };

                reader.readAsBinaryString(selectedFile);
            }*/

            if (!oFileUploader.getValue()) {
                MessageToast.show("Choose a file first");
                return;
            }
            oFileUploader.checkFileReadable().then(function () {
                oFileUploader.upload();
            }, function (error) {
                MessageToast.show("The file cannot be read. It may have changed.");
            }).then(function () {
                oFileUploader.clear();
            });

        },

        onLogDownload: function () {

            var aCols, oRowBinding, oSettings, oSheet, oTable;

            if (!this._oTable) {
                this._oTable = this.byId("idLogTable");
            }

            oTable = this._oTable;
            oRowBinding = oTable.getBinding('items');
            aCols = this.createColumnConfig();

            oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: 'Level'
                },
                dataSource: oRowBinding,
                fileName: 'ErrorLog.xlsx',
                worker: false // We need to disable worker because we are using a MockServer as OData Service
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });

        },

        createColumnConfig: function () {
            var aCols = [];

            aCols.push({
                label: 'Type',
                property: 'type',
                type: 'string'
            });

            aCols.push({
                label: 'Message',
                property: 'message',
                type: 'string'
            });

            return aCols;
        },
        handleTypeMissmatch: function (oEvent) {
            debugger;
            var aFileTypes = oEvent.getSource().getFileType();
            aFileTypes.map(function (sType) {
                return "*." + sType;
            });
            MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                " is not supported. Choose one of the following types: " +
                aFileTypes.join(", "));
        },

        handleValueChange: function (oEvent) {
            MessageToast.show("Press 'Upload File' to upload file '" +
                oEvent.getParameter("newValue") + "'");
        },

        prepareDate: function (d) {
            var array = d.split("."); //Split the string
            var dateFromNew = new Date(array[2], array[1] - 1, array[0]);

            return "\/Date(" + dateFromNew.getTime() + ")\/";

        }
    });
});