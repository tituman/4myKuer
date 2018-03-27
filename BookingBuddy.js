//Declare and define the diffrent SAP_Segment
var gcySAP_Segment = [
    {key : "BZ_Dach"},
    {key : "BZ_China"},
    {key : "BZ_World"},
    {key : "DZ_BCS"},
	{key : "China"},
	{key : "Türkei"},
	{key : "Taiwan"},
    {key : "USA"},
	{key : "Korea"},
	{key : "Japan"},
	{key : "DACH"},
    {key : "Italien"},
	{key : "Spanien"},
    {key : "ROW"}
];

var gcySAPClient_Matrix = [
    {key : "BZ_Dach",    value : 7993612, description : "Kostenstelle"},
    {key : "BZ_Dach",    value : 5101001, description : "Vertrieb"},
	
    {key : "BZ_China",    value : 7993613, description : "Kostenstelle"},
    {key : "BZ_China",    value : 5101002, description : "Vertrieb"},
	
    {key : "BZ_World",    value : 7993614, description : "Kostenstelle"},
    {key : "BZ_World",    value : 5101003, description : "Vertrieb"},
	
    {key : "DZ_BCS",    value : 7993631, description : "Kostenstelle"},
    
    {key : "China",     value : 101894720030, description : "alle China kunden"},
    
    {key : "Türkei",    value : 101894730030, description : "alle Türkei kunden"},
    
    {key : "Taiwan",    value : 101894740030, description : "alle Taiwan kunden"},
    
    {key : "USA",       value : 101894750050, description : "alle USA kunden"},
    
    {key : "Korea",     value : 101894760030, description : "restl. Korea kunden"},
    {key : "Korea",     value : 101894980010, description : "Ropick"},
	
    {key : "Japan",     value : 102159170010, description : "restl. japan kunden"},
    {key : "Japan",     value : 102372070020, description : "Nachi"},
    {key : "Japan",     value : 102142880010, description : "Toshiba"},
    
    {key : "DACH",      value : 101895010030, description : "Novitas"},
    {key : "DACH",      value : 101895090010, description : "IGM"},
    {key : "DACH",      value : 101895120010, description : "Lti Drives GmbH"},
    {key : "DACH",      value : 101941030010, description : "Hiwin GmbH"},
    
    {key : "Italien",      value : 102074420010, description : "CT Pack Srl"},
    {key : "Italien",      value : 101894990010, description : "Maspack SRL"},
    {key : "Italien",      value : 101895140010, description : "CMA"},
    {key : "Italien",      value : 101895150010, description : "GEM SRL"},
    {key : "Italien",      value : 101942610010, description : "Tecno Pack"},
    {key : "Italien",      value : 102297430010, description : "Bergami Packaging"},
    
    {key : "Spanien",      value : 101895020010, description : "Alle Spanien kunden"},
    
    {key : "ROW", value : 101894960010, description : "Electro AB (BluePrint)"},
    {key : "ROW", value : 101895100010, description : "Natreb Brazil"}
];

var gcyProcess = [
    {key : "MT0", description : "Seminar, Messen, Schulung besuchen"},
    {key : "147", description : "Dokumentieren"},
    {key : "105", description : "Büroarbeit"},
    {key : "150", description : "Besprechung"},
    {key : "151", description : "Anlernen, Schulung halten"},
    {key : "545", description : "Software Design"},
    {key : "565", description : "SW Implementierung, Nachbereitung IBN"},
    {key : "582", description : "SW Auslieferungstest"},
    {key : "590", description : "VB Inbetriebnahme"},
    {key : "592", description : "Inbetriebnahme"},
    {key : "605", description : "techn. Kundenbetreuung"},
    {key : "615", description : "Vorbereitung Messe"},
    {key : "PRW", description : "Produkt wartung"}
];

var buchungsMatrix = [
	{key : "7993221", allowedVals : ["MT0", "150", "615"]},
	{key : "1", allowedVals : ["MT0", "147", "150", "151", "545", "565", "582", "590", "592", "605", "615"]}
];
//HTML Objects
var gSelect_SAPSegment, gSelect_SAPClient, gSelect_Process, gHTMLoption;
//other variables
var i, firstFocus, giCostCenter, oncefocusedClient;

/*################################### Definition ###################################
    Create and define it as a HTML DOM Select Object
*/
gSelect_SAPSegment = document.createElement('select');
gSelect_SAPClient = document.createElement('select');
gSelect_Process = document.createElement('select');

//Assign attributes to the select objects
//Segment
gSelect_SAPSegment.name = 'ddl_SAP_Segment';
gSelect_SAPSegment.id = 'SAP_Segment_Select_ID';
gSelect_SAPSegment.title = 'Select Kst';
//Client
gSelect_SAPClient.name = 'ddl_SAP_Client';
gSelect_SAPClient.id = 'SAP_Client_Select_ID';
gSelect_SAPClient.title = 'Select sub. cat.';
gSelect_SAPClient.disabled = true; //Disable it at the beginning
//Process
gSelect_Process.name = "ddl_Process";
gSelect_Process.id = "Process_Select_ID";
gSelect_Process.title = "Select working process";


/*################################### Functions ###################################
    Here are all functions defined for the select Objects.
*/
//++++++++++++++++++++++++++++++ Functions for gSelect_SAP_Segment_ID ++++++++++++++++++++++++++++
//Function when something changed
gSelect_SAPSegment.onchange = function () {
    //Check if something was selected
    if (gSelect_SAPSegment.value !== 0) {//Selection is valid
        //Enable the Radio Buttons
        document.getElementById('EffortInt').disabled = false;
        document.getElementById('EffortExt').disabled = false;
        //Fill the Dropdownlist with options
        populateClient(this);
        //init the selected index of Clients
        gHTMLoption = document.createElement('option');
        gHTMLoption.value = 0;
        gHTMLoption.selected = true;
        gHTMLoption.text = 'Select Client';
        gSelect_SAPClient.appendChild(gHTMLoption);
        oncefocusedClient = false; //At the first focus delete the last option ('Select Client')
        gSelect_SAPClient.disabled = false; //enable the list
        //reset the cost center number
        giCostCenter = -1;
        document.getElementById('demo').innerHTML = "invalid: " + giCostCenter;
        //Disable the Effort radio button if Motion Segment selected
        if (gSelect_SAPSegment.value === 'BZ_Dach' || gSelect_SAPSegment.value === 'BZ_China' || 
			gSelect_SAPSegment.value === 'BZ_World' || gSelect_SAPSegment.value === 'DZ_BCS' ) {
            document.getElementById('EffortInt').disabled = true;
            document.getElementById('EffortExt').disabled = true;
            document.getElementById('demo').innerHTML = "disabled: " + giCostCenter;
        }
    }
};
//Function when this Dropdownlist is selected
gSelect_SAPSegment.onfocus = function () {
    if (!firstFocus) {
        //Delete the last option ("Select Segment")
        gSelect_SAPSegment.remove(gSelect_SAPSegment.length - 1);
        firstFocus = true;
    }
    //set the index back to init
    this.selectedIndex = -1;
};

//When selecting something else
gSelect_SAPSegment.onblur = function() {
    //Check if something has been selected
    if (gSelect_SAPSegment.selectedIndex < 0) {
        //Nothing has been selected -reset/init
        
        //Reset the Segment list to init
        gHTMLoption = document.createElement('option');
        gHTMLoption.value = 0;
        gHTMLoption.selected = true;
        gHTMLoption.text = 'Select Kts.';
        gSelect_SAPSegment.appendChild(gHTMLoption);
        firstFocus = false;
        
        //Clear the list of Clients
        while (gSelect_SAPClient.length > 0) {
            gSelect_SAPClient.remove(0); //remove the top option till nothing left   
        }
        //Add this option to gSelect_SAPClient at the beginning 
        gHTMLoption = document.createElement('option');
        gHTMLoption.value = 0;
        gHTMLoption.selected = true;
        gHTMLoption.text = 'Select Kts. first';
        gSelect_SAPClient.appendChild(gHTMLoption);
        gSelect_SAPClient.disabled = true;
        //reset the cost center number
        giCostCenter = -1;
        document.getElementById('demo').innerHTML = "invalid: " + giCostCenter;
    }
};

//Fill the DropDownlist 
for (i = 0; i < gcySAP_Segment.length; i++) {
    //create the HTML Option
    gHTMLoption = document.createElement('option');
    //Assign the value of this option
    gHTMLoption.value = gcySAP_Segment[i].key;
    //Assign the text to be shown of this option
    gHTMLoption.text = gcySAP_Segment[i].key;
    //Add this option to an HTML DOM Object
    gSelect_SAPSegment.appendChild(gHTMLoption);
}
//Add this option at the the end and as selected, will be deleted as soon as once focused
gHTMLoption = document.createElement('option');
gHTMLoption.value = 0;
gHTMLoption.selected = true;
gHTMLoption.text = 'Select Kts.';
gSelect_SAPSegment.appendChild(gHTMLoption);


//++++++++++++++++++++++++++++ Functions for gSelect_SAPClient +++++++++++++++++++++++++++++++++
//when client list is selected (focused)
gSelect_SAPClient.onfocus = function () {
    if (!oncefocusedClient) {
        //Delete the last option ("Select kunden")
        gSelect_SAPClient.remove(gSelect_SAPClient.length - 1);
        oncefocusedClient = true;
    }
    this.selectedIndex = -1;
};
//when something changed in the client list (selected something)
gSelect_SAPClient.onchange = function () {
    //Check Inter or Extern Effort
    updateAssignmentNr();
};


//Add this option to gSelect_SAPClient at the beginning (only done at the very start)
gHTMLoption = document.createElement('option');
gHTMLoption.value = 0;
gHTMLoption.selected = true;
gHTMLoption.text = 'Select Kts. first';
gSelect_SAPClient.appendChild(gHTMLoption);

//Fill the Dropdownlist - its a function because it depends on the selected option of gSelect_SAPSegment
function populateClient(selectedSegment) {
    //Clear the list 
    while (gSelect_SAPClient.length > 0) {
        gSelect_SAPClient.remove(0);  //remove the top option till nothing left      
    }
    
    //Fill the client list
    for (i = 0; i < gcySAPClient_Matrix.length; i++) { //search th whole client list 
        if (selectedSegment.value === gcySAPClient_Matrix[i].key) { //equals the Segment
            //create the HTML Option
            gHTMLoption = document.createElement('option');
            //Assign the value of this option
            gHTMLoption.value = gcySAPClient_Matrix[i].value;
            //Assign the text to be shown of this option
            gHTMLoption.text = gcySAPClient_Matrix[i].description;
            //Add this option to an HTML DOM Object
            gSelect_SAPClient.appendChild(gHTMLoption);
        }
    }
    
}


//++++++++++++++++++++++++++++ Functions for gSelect_Process +++++++++++++++++++++++++++++++++
gSelect_Process.onfocus = function () {
    //reset selected index
    this.selectedIndex = -1;
};
//Fill the DropDownList of Prozess
for (i = 0; i < gcyProcess.length; i++) {
    gHTMLoption = document.createElement('option');
    gHTMLoption.value = gcyProcess[i].key;
    gHTMLoption.text = gcyProcess[i].key;
    gHTMLoption.title = gcyProcess[i].description;
    gSelect_Process.appendChild(gHTMLoption);
}
//gSelect_Process.selectedIndex := -1;


//++++++++++++++++++++++ Functions for Radio Button Effort ++++++++++++++++++++
function updateAssignmentNr() {
    if (gSelect_SAPClient.selectedIndex != -1) {
        if (gSelect_SAPSegment.value === 'BZ_Dach' || gSelect_SAPSegment.value === 'BZ_China' || 
			gSelect_SAPSegment.value === 'BZ_World' || gSelect_SAPSegment.value === 'DZ_BCS' ) {
            //Does not have internal or external effort
            giCostCenter = parseInt(gSelect_SAPClient.value);
            document.getElementById('demo').innerHTML = giCostCenter;
        } else {
            //Check Inter or Extern
            if (document.getElementById('EffortInt').checked) {
                //Calculate the Assignment Number
                giCostCenter = parseInt(gSelect_SAPClient.value);
                document.getElementById('demo').innerHTML = "Internal: " + giCostCenter;
            } else {
                giCostCenter =  parseInt(gSelect_SAPClient.value) + parseInt(10);
                document.getElementById('demo').innerHTML = "External: " + giCostCenter;
            }
        }
    }
}



// Add the <div> to the DOM, then add the <select> to the <div>
function AssignHTMLObjects() {
    //Append the SAP_Depitor Dropdownlist and Alle its function to the HTML
    document.getElementById('SAP_Segment_ID').appendChild(gSelect_SAPSegment);
    document.getElementById('SAP_Client_ID').appendChild(gSelect_SAPClient);
    document.getElementById('Process_ID').appendChild(gSelect_Process);
}

