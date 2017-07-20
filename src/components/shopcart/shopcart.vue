<template>
<div class="shopcart">
	<div class="content">
		<div class="content-left">
			<div class="logo-wrapper">
				<div class="logo" :class="{'hightlight':totalQuantity}">
					<i class="icon-shopping_cart"></i>
				</div>
				<div class="num" v-show="totalQuantity">{{totalQuantity}}</div>
			</div>
			<div class="price" :class="{'hightlight':totalQuantity}">￥{{totalPrice}}</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="content-right">
			<div class="pay" :class="{'enough':totalPrice >= minPrice}">{{payDesc}}</div>
		</div>
	</div>
	<div class="ball-containner">
		<transition-group tag="p" name="flyball" :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" >
			<div class="ball" v-for="(ball,idx) in balls" v-show="ball.show" :key="ball"></div>
		</transition-group>
	</div>
</div>
</template>

<script>
	
export default{
	props:{
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		},
		selectedFoods:{
			type:Array,
			default(){
				return []
			}
		}
	},
	data(){
		return{
			balls:[
				{show:false},{show:false},{show:false},{show:false},{show:false}
			],
			dropballs:[]
		}
	},
	computed:{
		totalPrice(){
			let total = 0;
			this.selectedFoods.forEach((food)=>{
				total += food.price*food.quantity;
			})
			return total
		},
		totalQuantity(){
			let total = 0;
			this.selectedFoods.forEach((food)=>{
				total += food.quantity;
			})
			return total
		},
		payDesc(){
			if(this.totalPrice === 0){
				return `￥${this.minPrice}元起送`
			}else if(this.totalPrice < this.minPrice){
				let diff = this.minPrice - this.totalPrice;
				return `还差￥${diff}元起送`
			}else {
				return `去结算`
			}
		}
	},
	methods:{
		drop(target){
			console.log(target)
			this.balls.forEach((ball)=>{
				if(!ball.show){
					ball.show = true;
					ball.target = target;
//					this.set(ball,"target",target);
					this.dropballs.push(ball);
					return
				}
			})
		},
		beforeEnter: function (el) {
			let count = this.balls.length;
			console.log(count)
//			while(count--){
//				let ball = this.balls[count];
//				if(ball.show){
//					let rect = ball.target.getBoundingClientRect();
//					let x = rect.left -32;
//					let y = -(window.innerHeight-rect.top-22);
//					el.style.display = "";
//					el.style.webkitTransform = `translate3d(${x},${y},0)`;
//					el.style.transform = `translate3d(${x},${y},0)`;
//				}
//			}
		},
		enter: function (el, done) {
		    let rf = el.offsetHeight; //触发浏览器重绘
		    this.$nextTick(()=>{
		    	el.style.webkitTransform = 'translate3d(0,0,0)';
				el.style.transform = 'translate3d(0,0,0)';
		    })
		},
		afterEnter: function (el) {
		    let ball = this.dropballs.shift();
		    if(ball){
		    	ball.show=false;
		    	el.style.display="none";
		    }
		}
	}
}
</script>

<style scoped>
.shopcart{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 48px;
	z-index: 50px;
}
.shopcart .content{
	display: flex;
	background-color:#141d27;
	font-size: 0;
	color: rgba(255,255,255,0.4);
}
.content-left{
	flex: 1;
}
.content-left .logo-wrapper{
	display: inline-block;
	vertical-align: top;
	position: relative;
	top: -10px;
	padding: 6px;
	margin: 0 12px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	box-sizing: border-box;
	background-color: #141d27;
}
.content-left .logo-wrapper .logo{
	width: 44px;
	height: 44px;
	border-radius: 50%;
	text-align: center;
	background-color: #2b343c;
}
.content-left .logo-wrapper .icon-shopping_cart{
	font-size: 24px;
	line-height: 44px;
}
.content-left .logo-wrapper .hightlight{
	background-color: rgb(0,160,220);
}
.content-left .logo-wrapper .hightlight .icon-shopping_cart{
	color: rgb(255,255,255);
}
.content-left .logo-wrapper .num{
	position: absolute;
	top: 0;
	right: 0;
	width: 24px;
	height: 16px;
	font-size: 9px;
	line-height: 16px;
	font-weight: 700;
	border-radius: 8px;
	text-align: center;
	color: rgb(255,255,255);
	background-color: rgb(240,20,20);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.content-left .price,.content-left .desc{
	display: inline-block;
	vertical-align: top;
	margin-top: 12px;
	font-size: 10px;
	line-height: 24px;
}
.content-left .price{
	margin-right: 12px;
	padding-right: 12px;
	font-size: 16px;
	font-weight: 700;
	border-right: 1px solid rgba(255,255,255,0.1);
}
.content-left .price.hightlight{
	color: #FFFFFF;
}
.content-right{
	flex: 0 0 105px;
	width: 105px;
}
.content-right .pay{
	height: 48px;
	padding: 12px 8px 0 8px;
	text-align: center;
	font-size: 12px;
	line-height: 24px;
	font-weight: 700;
	background-color: #2b343c;
}
.content-right .pay.enough{
	background-color: #00b43c;
	color: #FFFFFF;
}

.shopcart .ball-containner{
	
}

.shopcart .ball-containner .ball{
	position: fixed;
	left: 32px;
	bottom: 22px;
	z-index: 200;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background:rgb(0,160,220);
	transition: all .5s liner;
}

/*.flyball-enter-active{
	
}
.flyball-enter{
	
}*/


</style>