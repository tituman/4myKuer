function Func1() {
	var iframe = document.getElementById('lower');
	var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	var elm = innerDoc.getElementById('ok');
	elm.focus();
	simulateClick(elm);
	return;
}

function Func2() {
	var iframe = document.getElementById('app');
	var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	var elms = innerDoc.getElementsByClassName('p1006infotableicons');
	var elm;
	elm = elms[3];
	elm.focus();
	simulateClick(elm);
	return;
}

function simulateClick(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var canceled = !elm.dispatchEvent(evt);
	if (canceled) {} else {}
	return;
}

function findNextemptyCell(innerDoc) {
	var cell;
	var p0 = 'p0';
	var emptyCellName = 0;
	for (var i = 1; i < 8; i++) {
		emptyCellName = 4 + (i * 100);
		cell = innerDoc.getElementsByName(p0 + emptyCellName);
		if (cell === null || cell == 'undefined' || cell === 0) {
			return 0;
		} else {
			if (cell[0].value === '') {
				return i;
			}
		}
	}
}

function BookIt() {
	alert('Executing BookIt()');
	var iframe = document.getElementById('app');
	var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	var cell1, cell2, cell3;
	var p0 = 'p0';
	var cell1name = 4;
	var cell2name = 5;
	var cell3name = 6;
	var emptyCellNumber = findNextemptyCell(innerDoc);
	if (emptyCellNumber < 1 || emptyCellNumber > 7) {
		alert('cell error!');
		return;
	}
	if (cell1 = innerDoc.getElementsByName(p0 + (cell1name + (emptyCellNumber * 100)))) {
		cell1[0].value = '++.++';
	}
	if (cell2 = innerDoc.getElementsByName(p0 + (cell2name + (emptyCellNumber * 100)))) {
		cell2[0].value = '101894980010';
	}
	if (cell3 = innerDoc.getElementsByName(p0 + (cell3name + (emptyCellNumber * 100)))) {
		cell3[0].value = '590';
	}
	setTimeout('Func1()', 750);
	setTimeout(function() {
		Func2();
	}, 6000);
}

