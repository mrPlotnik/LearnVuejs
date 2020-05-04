//////////////////////////////////////////////////////
// Vue.js
//////////////////////////////////////////////////////

//-----------------------------------------
// #app02-01
//-----------------------------------------
new Vue({ // 'new' - создает новый экземпляр класса
	el: '#app02-01', // 'el' - обязательный элемент. Указываем CSS селектор, который нужно инициализировать
	data: {
		name: '!',
		number: '100',
		isOk: true,
		number2: '100',
		isOk2: true,
		string: 'My name is Andrey!'			
	},
	methods: {
		changeName: function(event) {
			this.name = event.target.value + '!'
		},
		sayHello: function() {
			return 'I am function'
		}
	}
});

//-----------------------------------------
// #app02-02
//-----------------------------------------
new Vue({ 
	el: '#app02-02', 
	data: {
		url: 'http://google.com'
	},
})

//-----------------------------------------
// #app02-03
//-----------------------------------------
new Vue({ 
	el: '#app02-03', 
	data: {
		link: '<a href="http://google.com">Google</a>'
	},
})

//-----------------------------------------
// #app02-04
//-----------------------------------------
new Vue({ 
	el: '#app02-04', 
	data: {
		counter: 0,
		counter2: 0
	},
	methods: {
		riseCounter: function() {
			this.counter++
		},
		on: function(event) {
			event.target.style.color = 'red'
		},
		off: function(event) {
			event.target.style.color = 'inherit'
		},
		randomColor: function (event) {
		  var letters = '0123456789ABCDEF';
		  var color = '#';
		  for (var i = 0; i < 6; i++) {
		    color += letters[Math.floor(Math.random() * 16)];
		  }
		  event.target.style.backgroundColor = color;
		},
		offRandomColor: function(event) {
			event.target.style.backgroundColor = 'inherit'
		},
	}
})

//-----------------------------------------
// #app02-05
//-----------------------------------------
new Vue({
	el: '#app02-05', 
	data: {
		counter: 0,
		counter2: 0,
		step: null
	},
	methods: {
		riseCounter: function(num) {
			this.counter += num
		},
		riseCounter2: function(num, step, event) {
			this.counter2 += num;
			this.step = step;

			if (num === 1) {
				event.target.style.color = 'green'
			}
			else if (num === 5) {
				event.target.style.color = 'red'
			}
			else if (num === 10) {
				event.target.style.color = 'blue'
			}
		}			
	}
})

//-----------------------------------------
// #app02-06
//-----------------------------------------
new Vue({
	el: '#app02-06', 
	data: {
		x: 0,
		y: 0
	},
	methods: {
		clickOnGoogle: function(event) {
			event.preventDefault()
		},
		handlerMouseMove: function(event) {
			this.x = event.clientX
			this.y = event.clientY
		}
	}
})

//-----------------------------------------
// #app02-07
//-----------------------------------------
new Vue({
	el: '#app02-07', 
	data: {
	
	},
	methods: {
		alertValue: function(event) {
			if (event.keyCode === 13) {
				alert(event.target.value)
			}
		},
		alertValue2: function(event) {				
			alert(event.target.value)
		}
	}
})

//-----------------------------------------
// #app02-08
//-----------------------------------------
new Vue({
	el: '#app02-08', 
	data: {
		url: 'http://google.com',
		counter: 0
	}	
})

//-----------------------------------------
// #app02-09
//-----------------------------------------
new Vue({
	el: '#app02-09', 
	data: {
		inputValue: 'Initial Value',
		inputValue2: 'Initial Value'
	}	
})

//-----------------------------------------
// #app02-10
//-----------------------------------------
new Vue({
	el: '#app02-10', 
	data: {
		isActive: false,	
		isActive2: false,	
		color: ''
	},
	// Уже вычисленное
	computed: {
		getCssClasses: function() {
			return {
				'red' : this.isActive2,
				'green' : !this.isActive2
			}
		}
	}	
})

//-----------------------------------------
// #app02-11
//-----------------------------------------
new Vue({
	el: '#app02-11', 
	data: {
		color: '#111',
		color2: '#555',
		color3: '#999',
		height: 50,
		height1: 40,
		diameter3: 60
	},
	// Уже вычисленное
	computed: {
		circleClasses: function() {
			return {
				'background': this.color2, 
				'height': this.height1 + 'px'				
			}
		},
		circleClasses2: function() {
			return {
				'background': this.color3, 
				'height': this.diameter3 + 'px', 
				'width': this.diameter3 + 'px'
			}
		}
	}	
})

//-----------------------------------------
// #app02-12
//-----------------------------------------
new Vue({
	el: '#app02-12', 
	data: {
		isVisible: true,
		isVisible2: true,
		type: 'a'
	},	
	computed: {		
		
	}	
})


