/*===
Into Binary (https://madewithlove.intobinary.org)
&copy Coryright 2022 Into Binary. All rights reserved.
Written for -- www.madewithlove.intobinary.org
===*/

/*=== LIBRARIES ===*/

/*=== END LIBRARIES ===*/

/*=== CUSTOM ===*/
/** WWW ***/

	/*** GLOBAL VARIABLES & OBJECTS ***/
	var ib_form = document.querySelector(".js-form");
	/*** END GLOBAL VARIABLES & OBJECTS ***/
	
	/*** SETUP ***/
//	animateCards();
	/*** END SETUP ***/
	
	/*** EVENTS ***/
	ib_form.addEventListener("submit", ib_handleSubmit);
	/*** END EVENTS ***/
	
	/*** ACTIONS ***/
	/*** END ACTIONS ***/
	
	/*** FUNCTIONS ***/
	async function ib_handleSubmit(event) {
		event.preventDefault();
		
		var status = document.querySelector(".js-form-status");
		var data = new FormData(event.target);
		
		fetch(event.target.action, {
			method: ib_form.method,
			body: data,
			headers: {
				"Accept": "application/json"
			}
		}).then(response => {
			if(response.ok) {
				status.innerHTML = "Thanks for your submission!";
				ib_form.reset();
			} else {
				response.json().then(data => {
					if(Object.hasOwn(data, "errors")) {
						status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
					} else {
						status.innerHTML = "Oops! There was a problem submitting your ib_form.";
					}
				});
			}
		}).catch(error => {
			status.innerHTML = "Oops! There was a problem submitting your ib_form.";
		});
	}
	/*** END FUNCTIONS ***/

/*=== END CUSTOM ===*/