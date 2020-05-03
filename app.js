const resLangs = {EL:"el", EN:"en"} ;
const resType = {JS:0, TEXT:1, PLACEHOLDER:2, CLASS:3} ;

const res = {
	mainheader: {
		type: resType.TEXT,
		el: "Δημιουργία SMS δήλωσης μετακίνησης",
		en: "Extraordinary Movement Permit SMS"
	},
	onoma: {
		type: resType.PLACEHOLDER,
		el: "Το ονοματεπώνυμό σας",
		en: "Your fullname"
	},
	addr: {
		type: resType.PLACEHOLDER,
		el: "Η διεύθυνση της κατοικίας σας",
		en: "Your home address"
	},
	legend: {
		type: resType.TEXT,
		el: "Σκοπός μετακίνησης:",
		en: "Movement reason:"
	},
	label1: {
		type: resType.TEXT,
		el: "1. Μετάβαση σε φαρμακείο ή σε γιατρό",
		en: "1. Going to the pharmacy or visiting a Medical Doctor"
	},
	label2: {
		type: resType.TEXT,
		el: "2. Προμήθειες αγαθών πρώτης ανάγκης",
		en: "2. Going to a supply store in operation"
	},
	label3: {
		type: resType.TEXT,
		el: "3. Μετάβαση στην τράπεζα",
		en: "3. Going to the bank"
	},
	label4: {
		type: resType.TEXT,
		el: "4. Παροχή βοήθειας σε ανθρώπους που βρίσκονται σε ανάγκη",
		en: "4. Going to help people in need"
	},
	label5: {
		type: resType.TEXT,
		el: "5. Μετάβαση σε τελετή ή εν διαστάσει γονέων σε τέκνα",
		en: "5. Going to a ceremony or divorced parents to childs"
	},
	label6: {
		type: resType.TEXT,
		el: "6. Σωματική άσκηση σε εξωτερικό χώρο ή κίνηση με κατοικίδιο ζώο",
		en: "6. Physical exercise in an open space or for a pet’s needs"
	},
	sms: {
		type: resType.PLACEHOLDER,
		el: "Συμπληρώστε ονοματεπώνυμο, διεύθυνση οικίας και επιλέξτε σκοπό",
		en: "Fill in your fullname, home address and select a reason"
	},
	send: {
		type: resType.TEXT,
		el: "Αποστολή SMS στο 13033",
		en: "Send SMS to 13033"
	},
	aboutheader: {
		type: resType.TEXT,
		el: "Πληροφορίες",
		en: "Info"
	},	
	appinfotitle: {
		type: resType.TEXT,
		el: "Δημιουργία SMS δήλωσης μετακίνησης",
		en: "Extraordinary Movement Permit SMS"
	},
	copyright: {
		type: resType.TEXT,
		el: "Πέτρος Κυλαδίτης",
		en: "Petros Kyladitis"
	},
	github: {
		type: resType.TEXT,
		el: "Αποθετήριο κώδικα GitHub",
		en: "GitHub code repository"
	},
	lastmod:{
		type: resType.TEXT,
		el: "Τελευταία ενημέρωση: 03 Μάη 2020",
		en: "Last update: May 03 2020"
	},
	description: {
		type: resType.TEXT,
		el: "Ένα Progressive Web App, με σκοπό να βοηθήσει τους πολίτες στη δημιουργία δήλωσης μετακίνησης μέσω SMS στο 13033. Σύμφωνα με τις οδηγίες του",
		en: "A Progressive Web App, in order to assist citizens in creating an Extraordinary Movement Permit SMS for 13033. According to its instructions"
	},
	privacy: {
		type: resType.TEXT,
		el: "Τα στοιχεία, ονοματεπώνυμό και διεύθυνση αποθηκεύονται τοπικά, στην προσωρινή μνήμη του browser του κινητού σας. Κανένα προσωπικό στοιχείο δε μεταφέρεται στον server που φιλοξενεί την εφαρμογή.",
		en: "The data, name and address are stored locally, in the temporary memory of your mobile device browser. No personal data is transferred to the server hosting the application."
	},
	lang: {
		type: resType.CLASS,
		el: "ui-icon-elflag",
		en: "ui-icon-enflag"
	},
	onlymob: {
		type: resType.JS,
		el: "Η αποστολή μηνύματος υποστηρίζεται μόνο από κινητά τηλέφωνα",
		en: "Sending a message is only supported by mobile phones"
	},
	attention: {
		type: resType.TEXT,
		el: "Με βάση τις τελευταίες κυβερνητικές οδηγίες, από τις 04/05/20, για τις μετακινήσεις των πολιτών, καταργείται η υποχρέωση αποστολής SMS στο 13033.",
		en: "Due the latest government directives, from 04/05/20, on the movement of citizens, the obligation to send SMS to 13033 is abolished."
	}
};


let storedLang = localStorage.getItem("lang") ;
var curLang = (storedLang != null && resLangs.hasOwnProperty(storedLang.toUpperCase())) ? storedLang : resLangs.EL ;

for(let item in res){
	switch (res[item].type) {
		case resType.PLACEHOLDER:
			$("#" + item).attr("placeholder", res[item][curLang]) ;
		case resType.CLASS:
			$("#" + item).addClass(res[item][curLang]) ;
		case resType.TEXT:
			$("#" + item).text(res[item][curLang]) ;
	}
}

$(document).ready(function(){
	let attentionDay = new Date(2020, 4, 4, 0, 0, 0, 0) ;
	if(Date.now() > attentionDay.valueOf()){
		$("#attention").show();
	}
	$("#onoma").val(localStorage.getItem("onoma")) ;
	$("#addr").val(localStorage.getItem("addr")) ;
		
	$("input[name='moveRadio']").click(function(){
		let onoma = $("#onoma").val() ;
		let addr = $("#addr").val() ;
		if(onoma.length > 0 && addr.length  > 0){
			$("#send").removeClass("ui-disabled") ;
			$("#sms").val($(this).val() + " " + onoma + " " + addr);
			let copyText = document.getElementById("sms");
			copyText.select();
			copyText.setSelectionRange(0, 99999);
			document.execCommand("copy");
			if(isMobile()){
				$("#send").attr("href", "sms:13033?body=" + encodeURI($("#sms").val()));
			}else{
				$("#send").attr("href", "javascript:alert('" + res.onlymob[curLang] + "')");
			}
		}else{
			$("#sms").val("") ;
			$("#send").addClass("ui-disabled") ;
		}
	});
	$(".ui-input-clear").on("click", function() {
		$("#send").addClass("ui-disabled") ;
		$("#sms").val("") ;
	});
	
	$("#lang").click(function(){
		curLang = curLang == resLangs.EL ? resLangs.EN : resLangs.EL ;
		localStorage.setItem("lang", curLang)
		location.reload() ;
	});
	
	window.addEventListener('beforeunload', function(){
			localStorage.setItem("onoma", $("#onoma").val()) ;
			localStorage.setItem("addr", $("#addr").val()) ;
	});
});

function isMobile() {
	const toMatch = [/Android/i,/iPhone/i];
	return toMatch.some((toMatchItem) => {
		return navigator.userAgent.match(toMatchItem);
	});
}

if('serviceWorker' in navigator){
	navigator.serviceWorker.register('sw.js', { scope: '/apps/13033/' });
}