<template>
<transition name="moveIn">
	<div class="food" v-show="showFlag" ref="food">
		<div class="food-content">
			<div class="img-header">
				<img :src="food.image"/>
				<div class="back" @click="hide">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
			</div>
			<div class="cartcontrol-wrapper">
				<cartcontrol :food="food"></cartcontrol>
			</div>
			<transition name="fadeOut">
				<div class="buy" @click="addFirst" v-show="!food.quantity||food.quantity===0">加入购物车</div>
			</transition>
			
		</div>
	</div>
</transition>
</template>

<script>
import Vue from "vue"
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'

export default{
	props:{
		food:{
			type:Object
		}
	},
	data(){
		return{
			showFlag:false
		}
	},
	methods:{
		show(){
			this.showFlag = true;
			this.$nextTick(()=>{
				if(!this.foodScroll){
					this.foodScroll = new BScroll(this.$refs.food,{click:true});
				}else{
					this.foodScroll.refresh();
				}
				
			})
		},
		hide(){
			this.showFlag = false;
		},
		addFirst(ev){
			if(!ev._constructed){
				return
			}
			console.log(ev.target)
			this.$emit('cartadd',ev.target);
			Vue.set(this.food,"quantity",1)
		}
	},
	components:{
		cartcontrol
	}
}
</script>

<style>
.food{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 48px;
	z-index: 30px;
	width: 100%;
	background: #FFFFFF;
}
.moveIn-enter-active,.moveIn-leave-active{
	transition: all .5s; 
}
.moveIn-enter,.moveIn-leave-active{
	transform: translate3d(100%,0,0);
}

.food-content{
	
}
.food-content .img-header{
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
}
.food-content .img-header img{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.food-content .img-header .back{
	position: absolute;
	top: 10px;
	left: 0;
}
.food-content .img-header .back .icon-arrow_lift{
	padding: 10px;
	display: block;
	font-size: 20px;
	color: #FFFFFF;
}
.food-content .content{
	padding: 18px;
}
.food-content .content .title{
	margin-bottom: 8px;
	font-size: 14px;
	line-height: 14px;
	font-weight: 700;
	color:rgb(7,17,27);
}
.food-content .content .detail{
	margin-bottom: 18px;
	font-size: 0;
	line-height: 10px;
	color:rgb(147,153,159);
	height: 10px;
}
.food-content .content .sell-count,.food-content .content .rating{
	font-size: 10px;
	margin-right: 12px;
}

.food-content .content .price{
	font-weight: 700;
	font-size: 0;
	line-height: 24px;
}
.food-content .content .now{
	margin-right: 8px;
	font-size: 14px;
	color:rgb(240,20,20);
}
.food-content .content .old{
	text-decoration: line-through;
	font-size: 10px;
	color:rgb(147,153,159);
}

.food-content .cartcontrol-wrapper{
	position: absolute;
	right: 12px;
	bottom:12px;
}
.food-content .buy{
	position: absolute;
	right: 18px;
	bottom: 19px;
	height: 24px;
	font-size: 10px;
	line-height: 24px;
	z-index: 10;
	padding: 0 12px;
	box-sizing: border-box;
	border-radius: 12px;
	color: #FFFFFF;
	background: rgb(0,160,220);
}
.fadeOut-enter-active,.fadeOut-leave-active{
	opacity: 1;
	transition: all .3s;
}
.fadeOut-enter,.fadeOut-leave-to{
	opacity: 0;
}
</style>