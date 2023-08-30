function header_adj() {
	if ($(window).width() < 767) {
		var header_height = $(".header").outerHeight();
		$(".nav-wrap .nav-list").css({ "padding-top": header_height + "px" });
	} else {
		$(".nav-wrap .nav-list").css({ "padding-top": "0" });
	}
}
function submenu_toggle() {
	if ($(window).width() < 767) {
		$(".nav-list li.with-submenu")
			.off()
			.click(function () {
				$(this).toggleClass("is-open");
				$(".submenu").slideToggle("slow");
			});
	}
}
$(document).ready(function () {
	header_adj();
	submenu_toggle();
	if ($(window).width() < 767) {
		$(".hamburger")
			.off()
			.click(function () {
				$(this).toggleClass("is-active");
				$("body,html").toggleClass("sidebar-open");
				$(".nav-wrap").toggleClass("is-open");
			});

		$(".overlay")
			.off()
			.click(function () {
				$(".hamburger").removeClass("is-active");
				$("body,html").removeClass("sidebar-open");
				$(".nav-wrap").removeClass("is-open");
			});
	} else {
		$(".hamburger").removeClass("is-active");
		$("body,html").removeClass("sidebar-open");
		$(".nav-wrap").removeClass("is-open");
	}
});
$(window).on("resize", function () {
	header_adj();
	submenu_toggle();
	if ($(window).width() < 767) {
		$(".hamburger")
			.off()
			.click(function () {
				$(this).toggleClass("is-active");
				$("body,html").toggleClass("sidebar-open");
				$(".nav-wrap").toggleClass("is-open");
			});

		$(".overlay")
			.off()
			.click(function () {
				$(".hamburger").removeClass("is-active");
				$("body,html").removeClass("sidebar-open");
				$(".nav-wrap").removeClass("is-open");
			});
	} else {
		$(".hamburger").removeClass("is-active");
		$("body,html").removeClass("sidebar-open");
		$(".nav-wrap").removeClass("is-open");
	}
});

var validator = new Dominar(document.querySelector('.dominar-form-contact'), {
	user_name: {
	  rules: 'required|min:3',
	  triggers: ['focusout', 'change', 'keyup'],
	  customMessages: {
		required: 'Please Enter Your Name',
		min: 'Please Enter Minimum of :min characters',
	  }
	},
	user_phone: {
		rules: 'required|digits:10',
		triggers: ['focusout', 'change', 'keyup'],
		customMessages: {
		  required: 'Please Enter Your Mobile Number',
		  digits: 'Enter Valid Mobile Number'

		}
	},
	user_message: {
	  rules: 'required|min:10',
	  triggers: ['focusout', 'change', 'keyup'],
	  customMessages: {
		required: 'Please Enter Your Message',
		min: 'Please Enter Minimum of :min characters',
	  }
	}
});

function submitForm(){
	validator.validateAll(validateForm);
}

function validateForm(){
    let dateStr = new Date().toString();
    let data = objectToFormData(
        {
            name: idval('user_name'), 
            phone:idval('user_phone'), 
            message: idval('user_message'),
            time: dateStr
        }
    );
	if(document.getElementById('spin-off').style.display === 'none'){
		return;
	}
    document.getElementById('spin-off').style.display = 'none';
    document.getElementById('spin-on').style.display = 'inline-block';
    fetch('https://script.google.com/macros/s/AKfycbxGs_6o1V2qBH9USNCimrOgmN5k1KGXpyffIXJ4YY2lzmIi0Zfs_WXzXcjiWvspTSiM/exec', {
        method: "POST",
        body: data
    })
    // The fetch() method is used to make a request to the server and retrieve data.
    // This is an example API endpoint. Replace it with the actual URL for the API endpoint you want to use.
    .then(res => res.text())
    // The .then() method is used to handle the response from the server.
    // The response is converted to text using the res.text() method.
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch(()=>{
        document.getElementById('spin-off').style.display = 'block';
        document.getElementById('spin-on').style.display = 'none';
    })
    ;
};

function objectToFormData(obj) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
};
function idval(id){
    return document.getElementById(id) && document.getElementById(id).value;
}