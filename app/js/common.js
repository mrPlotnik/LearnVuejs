//////////////////////////////////////////////////////
// Vue.js
//////////////////////////////////////////////////////

//-----------------------------------------
// 1-2
//-----------------------------------------
new Vue({ // 'new' - создает новый экземпляр класса
	el: '#app1-2', // 'el' - обязательный элемент. Указываем CSS селектор, который нужно инициализировать
	data: {
		name: '!',
		number: '100',
		isOk: true			
	},
	methods: {
		changeName: function(event) {
			this.name = event.target.value + '!'
		}
	}
});

new Vue({ 
	el: '#app2-1', 
	data: {
		number: '100',
		isOk: true,
		string: 'My name is Andrey!'
	},
	methods: {
		sayHello: function() {
			return 'I am function'
		}
	}
})

//-----------------------------------------
// 2-2
//-----------------------------------------
new Vue({ 
	el: '#app2-2', 
	data: {
		url: 'http://google.com'
	},
})

//-----------------------------------------
// 2-3
//-----------------------------------------
new Vue({ 
	el: '#app2-3', 
	data: {
		link: '<a href="http://google.com">Google</a>'
	},
})

//-----------------------------------------
// 2-4
//-----------------------------------------
new Vue({ 
	el: '#app2-4', 
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
// 2-5
//-----------------------------------------
new Vue({
	el: '#app2-5', 
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
// 2-6
//-----------------------------------------
new Vue({
	el: '#app2-6', 
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
// 2-7
//-----------------------------------------
new Vue({
	el: '#app2-7', 
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
// 2-8
//-----------------------------------------
new Vue({
	el: '#app2-8', 
	data: {
		url: 'http://google.com',
		counter: 0
	}
	
})

//-----------------------------------------
// 2-9
//-----------------------------------------
new Vue({
	el: '#app2-9', 
	data: {
		inputValue: 'Initial Value',
		inputValue2: 'Initial Value'
	}
	
})

