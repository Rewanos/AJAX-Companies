$(function() {

	$('.main-content').hide();
	$('.company_partners_list').hide();
	$('.company_country').hide();
	var genderVal = $('#sel1');
	var formData;

	var jVal = {
								'firstName' : function() {
												$('.name').append('<div id="nameInfo" class="info"></div>');
												var nameInfo = $('#nameInfo');
												var ele = $('#firstName');
												var pos = ele.offset();
												
												if(ele.val().length < 4) {
																jVal.errors = true;
																				nameInfo.removeClass('correct').addClass('error').html('← at least 4 characters').fadeIn(500);
																				ele.removeClass('normal').addClass('wrong');
												} else {
																				nameInfo.removeClass('error').addClass('correct').html('<i class="fas fa-check-circle fa-2x"></i>').fadeIn(500);
																				ele.removeClass('wrong').addClass('normal');
												}
								},
								'secoundName' : function() {
												$('.surname').append('<div id="surNameInfo" class="info"></div>');
												var surNameInfo = $('#surNameInfo');
												var ele = $('#secoundName');
												var pos = ele.offset();
												
												if(ele.val().length < 4) {
																jVal.errors = true;
																				surNameInfo.removeClass('correct').addClass('error').html('← at least 4 characters').fadeIn(500);
																				ele.removeClass('normal').addClass('wrong');
												} else {
																				surNameInfo.removeClass('error').addClass('correct').html('<i class="fas fa-check-circle fa-2x"></i>').fadeIn(500);
																				ele.removeClass('wrong').addClass('normal');
												}
								},
								'email' : function() {
												$('.email').append('<div id="emailInfo" class="info"></div>');
												var emailInfo = $('#emailInfo');
												var ele = $('#email');
												var pos = ele.offset();
												
												var patt = /^.+@.+[.].{2,}$/i;
												if(!patt.test(ele.val())) {
																jVal.errors = true;
																				emailInfo.removeClass('correct').addClass('error').html('Give me a valid email adress)').fadeIn(500);
																				ele.removeClass('normal').addClass('wrong');
												} else {
																				emailInfo.removeClass('error').addClass('correct').html('<i class="fas fa-check-circle fa-2x"></i>').fadeIn(500);
																				ele.removeClass('wrong').addClass('normal');
												}
								},
								'password' : function() {
												$('.pwd').append('<div id="passwordInfo" class="info col-sm-3"></div>');
												var passwordInfo = $('#passwordInfo');
												var ele = $('#pwd');
												var pos = ele.offset();
												
												var patt = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
												if(!patt.test(ele.val())) {
																jVal.errors = true;
																				passwordInfo.removeClass('correct').addClass('error').html('At least 6 letters, contain: capital letter, small letter and special symbol').fadeIn(500);
																				ele.removeClass('normal').addClass('wrong');
												} else {
																				passwordInfo.removeClass('error col-sm-3').addClass('correct').html('<i class="fas fa-check-circle fa-2x"></i>').fadeIn(500);
																				ele.removeClass('wrong').addClass('normal');
												}
								},
								'sendIt' : function (){
												if(!jVal.errors) {
																$('.form-horizontal').submit();
												}
								}
				};
// ====================================================== //
				$('#send').on('click', function (e){
								formData = {
											'name': $('#firstName').val(),
											'surname': $('#secoundName').val(),
											'email': $('#email').val(),
											'gender': $('#sel1').val(),
											'password': $('#pwd').val()
										}
								e.preventDefault();
								var obj = $(document) ? $('body') : $('html');
								obj.animate({ scrollTop: $('.form-horizontal').offset().top }, 750, function (){
												jVal.errors = false;
												jVal.firstName();
												jVal.secoundName();
												jVal.email();
												jVal.password();
												jVal.sendIt();
								});
								return false;

								
				});
				$('#firstName').change(jVal.firstName);
				$('#secoundName').change(jVal.secoundName);
				$('#email').change(jVal.email);
				$('#pwd').change(jVal.password);

	$('.form-horizontal').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);
                if(data.message == "Field 'secondname' is required" && data.status == "Form Error") {
                	$('.header_form').fadeOut(500);
                	$('.main-content').fadeIn(500);
                	showCompaniesData();
                } else  if (data.message == 'Email is not valid' && data.status == 'Form Error') {
                	alert(data.message + ' ' + data.status)

                } else  if (data.message == "Field 'gender' is required" && data.status == 'Form Error') {
                	alert(data.message + ' ' + data.status)

                } else  if (data.message == "Field 'secondname' should contain from 3 to 60 letters" && data.status == 'Form Error') {
                	alert(data.message + ' ' + data.status)

                } else  if (data.message == "Creating user error. Email already exists." && data.status == 'Error') {
                	alert(data.message + ' ' + data.status)

                } else  if (data.message == "Wrong route" && data.status == 'Error') {
                	alert(data.message + ' ' + data.status)
                } 

                // here we will handle errors and validation messages
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

	var companyData;

	function showCompaniesData() {

	//Get JSON
	var partnersArr = [];
	
	$.getJSON('http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList', function(data) {
		companyData = data;

		var comp = [0, 0, 0, 0, 0, 0];
		var countries = [];

		for (var i = 0; i < data.list.length; i++) {
			var obj = data.list[i];

			countries.push(obj.location.name);
		};
		var countries = uniqueValues(countries);
		console.log(countries)
     
		function totCon (country , number){
		  if (obj.location.name == country) {
		    comp[number]++
		    comp[number] = (comp[number] * data.list.length) / 100 ;
		  }
		}
		     		
		var $listUl = $('.company_list_ul');
		var $partnersUl = $('.company_partners_ul');
		var $partnersList = $('.company_partners_list')

		$('.company_numb').append('<div>' + data.list.length + '</div>');
		
		for (var i = 0; i < data.list.length; i++) {
			var obj = data.list[i];

				totCon (countries[0], 0);
		    totCon (countries[1], 1);
		    totCon (countries[2], 2);
		    totCon (countries[3], 3);
		    totCon (countries[4], 4);
		    totCon (countries[5], 5);

		   
			$listUl.append('<li id='+ obj.name+'>' + obj.name + '</li>');
		};
		cartData = countries.map(function(item, i) {
			return {
				"country": item,
				"value": comp[i],
				"pulled": false
			}
		});

		var classHighlight = 'highlight'; 
		var $thumbs = $('.company_list_ul li').click(function(e) {
		    
		    $thumbs.removeClass(classHighlight);
		    $(this).addClass(classHighlight);
		});

		$listUl.on('click', function(e) {

			for (var i = 0; i < data.list.length; i++) {
				$partnersList.fadeOut(5);
				var obj = data.list[i];
				var comapanyName = e.target.id;

				if(comapanyName == obj.name) {
				
				$partnersUl.html('')
				
				
				for(var k = 0; k < obj.partners.length; k++) {
					var partners = obj.partners;
					partnersArr = partners;
					
					partners = partners.sort(comparePartnersReverse)
					$partnersUl.append('<li>'+'<span>'+ partners[k].name + '</span>' + ' '+ partners[k].value + '%');
					
				};
			}
		}
			$partnersList.fadeIn(200);
		})
	
	})
		.done(function() {
		    $('.loader').delay(500).fadeOut(500)
		  });


	
	$('.company_partners_buttons').on('click', sortByParam);
	$('.company_country_button').on('click', hideList)
	$('.company_partners_list').on('dblclick', hidePartners)
	
	
	function sortByParam(e) {
		var target = e.target;
		var param = target.dataset.type;
		var $partnersUl = $('.company_partners_ul');

		if(partnersArr.length == 1) return
		
		$partnersUl.html('');

		if(partnersArr[0][param] > partnersArr[1][param]) {
			partnersArr = partnersArr.sort(comparePartnersParams);
		} else {
			partnersArr = partnersArr.sort(comparePartnersParamsReverse);
		}

		for(var k = 0; k < partnersArr.length; k++) {
			$partnersUl.append('<li>'+'<span>'+ partnersArr[k].name + '</span>' + ' '+ partnersArr[k].value + '%');
		};

		function comparePartnersParams(partnerA, partnerB) {
			if(partnerA[param] < partnerB[param]) return -1;
	    if(partnerA[param] > partnerB[param]) return 1;
	    return 0;
		}

		function comparePartnersParamsReverse(partnerA, partnerB) {
			if(partnerA[param] < partnerB[param]) return 1;
	    if(partnerA[param] > partnerB[param]) return -1;
	    return 0;
		}	
	};

	function comparePartners(partnerA, partnerB) {
		return partnerA.value - partnerB.value;
	}

	function comparePartnersReverse(partnerA, partnerB) {
		return partnerB.value - partnerA.value;
	}

	function uniqueValues(arr) {
		var obj = {};

		for(var i = 0; i < arr.length; i++) {
			var str = arr[i];
			obj[str] = true
		};
		return Object.keys(obj);
	};

	function hideList() {
		$('.company_country').fadeOut(500)
		$('#chartdiv').fadeIn(500)
	};

	function hidePartners() {
		$('.company_partners_list').fadeOut(500)
	};

	


	$.getJSON('http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList', function(data) {
		for(var i = 0; i < data.list.length; i++) {
			var post = data.list[i];
			var date = new Date(post.date * 1000);
			var day = date.getDay();
			var month = date.getMonth();

			if(day < 10) {
				day = '0' + day;
			};
			if(month < 10) {
				month = '0' + month;
			};
			var postDate = day + '.' + month + '.' + date.getFullYear();

			$('.news-block .swiper-wrapper').append('<div class="swiper-slide">' +
																								'<img class="news-image" src='+ '"'+ post.img + '"' + '>' + 
																								'<div class="slider-text">' +
																								'<h1 class="title"><a href=https://'+post.link+'>' + post.link + '</a></h1>' + 
																								'<p class="news-text">'+ post.description + '</p>' + 
																								'<span class="news-author"><strong>Автор:</strong> '+ post.author+'</span>' + 
																								'<p><span class="news-date"><strong>Дата:</strong> '+ postDate + '</span></p>' + 
																								'</div>'+
																							'</div>');

		};
	}).done(function() {
		$('.loader').delay(500).fadeOut(500)
		var size = 50;
		$('.news-text').each(function() {
			var $newText = $(this).text();

		if($newText.length > size) {
				$(this).text($newText.slice(0, size) + '...')
			}
		});
		var mySwiper = new Swiper ('.swiper-container', {
	    // Optional parameters
	    direction: 'horizontal',
	    loop: true,

	    // If we need pagination
	    pagination: {
	      el: '.swiper-pagination',
	    },

	    // Navigation arrows
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	  })
	  
	});
	};
		var chart = AmCharts.makeChart( "chartdiv", {
	  "type": "pie",
	  "theme": "light",
	  "valueField": "value",
	  "titleField": "country",
	  "pulledField": "pulled",
	  "outlineAlpha": 0.4,
	  "depth3D": 25,
	  // "innerRadius": 44,
	  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
	  "angle": 30,
	  "responsive": {
  "enabled": true,
  "rules": [
    // at 400px wide, we hide legend
    {
      "maxWidth": 400,
      "overrides": {
        "legend": {
          "enabled": true
        }
      }
    },

    // at 300px or less, we move value axis labels inside plot area
    // the legend is still hidden because the above rule is still applicable
    {
      "maxWidth": 300,
      "overrides": {
        "valueAxes": {
          "inside": true
        }
      }
    },

    // at 200 px we hide value axis labels altogether
    {
      "maxWidth": 200,
      "overrides": {
        "valueAxes": {
          "labelsEnabled": false
        }
      }
    }

  ]
},
	  "listeners": [{
	    "event": "clickSlice",
	    "method": function(e) {
	    	var target = e.dataItem.title;
				
				$('.company_country_list').html('')
				$('#chartdiv').fadeOut(500);
				for (var i = 0; i < companyData.list.length; i++) {
					var obj = companyData.list[i];

					if (obj.location.name == target) {
						$('.company_country_list').append('<li>' + obj.name + '</li>');
							
					}
				}
				$('.company_country').fadeIn(500);
				e.chart.validateData();
			}
	  }]
	  
	});
	var cartData = [ {country: "Poland", value: 34, pulled: false},
									 {country: "Ukraine", value: 18, pulled: false}, 
									 {country: "United States", value: 23, pulled: false}, 
									 {country: "Norway", value: 4, pulled: false}, 
									 {country: "Sweden", value: 18, pulled: false}, 
									 {country: "Germany", value: 3, pulled: false}
								 ]
	chart.dataProvider = cartData;
	chart.responsive = {
	  "enabled": true
	};
});
