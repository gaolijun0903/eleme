<template>
<div>
<div class="shopcart">
	<div class="content" @click="toggleShow">
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
		<div class="content-right" @click.stop="pay">
			<div class="pay" :class="{'enough':totalPrice >= minPrice}">{{payDesc}}</div>
		</div>
	</div>
	<!--5个下落小球动画-->
	<div class="ball-containner">
		<transition name="flyball" 
			@before-enter="beforeEnter" 
			@enter="enter"
			@after-enter="afterEnter"
			v-for="(ball,idx) in balls" 
			:key="idx">
			<div class="ball" v-show="ball.show">
				<div class="inner inner-hook"></div>
			</div>
		</transition>
	</div>
	<!--购物车商品列表-->
	<transition name="fold">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<span class="name">购物车</span>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="cartList">
				<ul>
					<li class="food" v-for="food in selectedFoods">
						<span class="name">{{food.name}}</span>
						<span class="price">￥{{food.price*food.quantity}}</span>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food = "food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</transition>
	
</div>
<!--购物车商品列表背景层-->
<div class="listMask"  v-show="listShow" @click="hideList"></div>

	
</div>	
	
</template>

<script>
import cartcontrol from "components/cartcontrol/cartcontrol"	
import BScroll from "better-scroll"

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
			dropballs:[],
			fold:true
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
		},
		listShow(){
			if(!this.totalQuantity){
				this.fold = true;
				return false;
			}
			let show = !this.fold;
			if(show){
				this.$nextTick(()=>{
					if(!this.cartListScroll){
						this.cartListScroll = new BScroll(this.$refs.cartList,{click:true});
					}else{
						this.cartListScroll.refresh();
					}
				})
			}
			return show;
		}
	},
	methods:{
		pay(){
			if(this.totalPrice < this.minPrice){
				return 
			}
			window.alert(`需要支付${this.totalPrice}元`)
		},
		toggleShow(){
			if(!this.totalQuantity){
				return ;
			}
			this.fold = !this.fold;
		},
		empty(){
			this.selectedFoods.forEach((food)=>{
				food.quantity = 0;
			})
		},
		hideList(){
			this.fold =true;
		},
		drop(target){
			for(let i=0;i< this.balls.length;i++){
				let ball = this.balls[i];
				if(!ball.show){
					ball.show = true;
					ball.target = target;
					this.dropballs.push(ball);
					return;
				}
			}
		},
		beforeEnter: function (el) {
			let count = this.balls.length;
			while(count--){
				let ball = this.balls[count];
				if(ball.show){
					let rect = ball.target.getBoundingClientRect();
					let x = rect.left -32;
					let y = -(window.innerHeight-rect.top-22);
					el.style.display ="";
					el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
					el.style.transform = `translate3d(0, ${y}px, 0)`;
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
					inner.style.transform = `translate3d(${x}px, 0, 0)`;
				}
			}
		},
		enter: function (el,done) {
		    let rf = el.offsetHeight; //触发浏览器重绘
		    this.$nextTick(()=>{
		    	el.style.webkitTransform = 'translate3d(0,0,0)';
				el.style.transform = 'translate3d(0,0,0)';
				let inner = el.getElementsByClassName('inner-hook')[0];
				inner.style.webkitTransform = 'translate3d(0,0,0)';
				inner.style.transform = 'translate3d(0,0,0)';
		    })
			setTimeout(()=>{
			   	done();
			},600)
		},
		afterEnter: function (el) {
		    let ball = this.dropballs.shift();
		    if(ball){
		    	ball.show=false;
		    	el.style.display="none";
		    }
		}
	},
	components:{
		cartcontrol
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
	z-index: 50;
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

.shopcart .ball-containner .ball{
	position: fixed;
	left: 32px;
	bottom: 22px;
	z-index: 200;
}
.shopcart .ball-containner .ball .inner{
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background:rgb(0,160,220);
	transition: all .5s linear;	
}
.flyball-enter-active{
 	transition: all .6s cubic-bezier(0.23,-0.36,0.93,0.71);
}

.shopcart .shopcart-list{
	position: absolute;
	top: -540%;
	left: 0;
	z-index: -1;
	width: 100%;
}
.shopcart .shopcart-list .list-header{
	height: 40px;
	line-height: 40px;
	background:#f3f5f7;
	padding:0 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcart .list-header .title{
	float: left;
	font-size: 14px;
	color: rgb(7,17,27);
}
.shopcart .list-header .empty{
	float: right;
	font-size: 12px;
	color: rgb(0,160,220);
}
.shopcart .shopcart-list .list-content{
	padding: 0 18px;
	max-height: 217px;
	overflow: hidden;
	background: #FFFFFF;
}
.shopcart .list-content .food{
	position: relative;
	padding: 12px 0;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcart .list-content .food .name{
	font-size: 14px;
	line-height: 24px;	
	color: rgb(7,17,27);
}
.shopcart .list-content .food .price{
	position: absolute;
	right: 90px;
	bottom: 12px;
	font-size: 14px;
	line-height: 24px;
	font-weight: 700;
	color:rgb(240,20,20);
	
}
.shopcart .list-content .food .cartcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 6px;
}
 .listMask{
	position: fixed;
	top: 0;
	left:0;
	width: 100%;
	height: 100%;
	z-index: 40;
	backdrop-filter:blur(10px);
	background-color: rgba(7,17,27,0.6);
}


/*.fold-enter-active,.fold-leave-active{
	transition:all .4s linear;
	transform:translate3d(0,-300px,0); 
}

.fold-enter,.fold-leave-to{
	transform:translate3d(0,0,0); 
}*/
</style>