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
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<transition name="fadeOut">
					<div class="buy" @click.stop.prevent="addFirst" v-show="!food.quantity||food.quantity===0">加入购物车</div>
				</transition>
			</div>
			<split  v-show="food.info"></split>	
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split  v-show="food.ratings"></split>	
			<div class="rating" v-show="food.ratings">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @ratingType="selectFn" @contentToggle="toggleContent"> </ratingselect>
			</div>
			<div class="rating-wrapper">
				<ul v-show="food.ratings && food.ratings.length">
					<li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
						<div class="user">
							<span class="name">{{rating.username}}</span>
							<img class="avatar" :src="rating.avatar" />
						</div>
						<div class="time">{{rating.rateTime}}</div>
						<p class="text">
							<span :class="{'icon-thumb_up':rating.rateType===0  ,'icon-thumb_down':rating.rateType===1 }"></span>{{rating.text}}
						</p>
					</li>
				</ul>
				<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价内容</div>
			</div>
			
			
		</div>
	</div>
</transition>
</template>

<script>
import Vue from "vue"
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'

const POSITIVE = 0;
const NEGTIVE = 1;
const ALL =2;

export default{
	props:{
		food:{
			type:Object
		}
	},
	data(){
		return{
			showFlag:false,
			selectType:ALL,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'推荐',
				negtive:'吐槽'
			}
		}
	},
	methods:{
		show(){
			this.showFlag = true;
			this.selectType = ALL;
			this.onlyContent = true;
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
		},
		selectFn(type){
			this.selectType = type;
		},
		toggleContent(onlyContent){
			this.onlyContent = onlyContent;
		},
		needShow(rateType,text){
			if(this.onlyContent && !text){
				return false;
			}
			if(this.selectType === ALL){
				return true;
			}else{
				return rateType === this.selectType ;
			}
		}
	},
	components:{
		cartcontrol,
		split,
		ratingselect
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
	position: relative;
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

.food-content .content .cartcontrol-wrapper{
	position: absolute;
	right: 12px;
	bottom:12px;
}
.food-content .content .buy{
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

.food-content .info{
	padding: 18px;
}
.food-content .info .title{
	margin-bottom: 6px;
	font-size: 14px;
	line-height: 14px;
	color:rgb(7,17,27)
}
.food-content .info .text{
	padding:0 8px;
	font-size: 12px;
	line-height: 24px;
	color:rgb(77,85,93);
}
.food-content .rating {
	padding-top: 18px;
}
.food-content .rating .title{
	margin-left: 18px;
	font-size: 14px;
	line-height: 14px;
	color:rgb(7,17,27);
}
.food-content .rating-wrapper{
	padding:0 18px;
}
.food-content .rating-wrapper .rating-item{
	position: relative;
	padding: 16px 0;
	border-bottom:1px solid rgba(7,17,27,0.1)
}
.food-content .rating-item .user{
	position: absolute;
	top: 16px;
	right: 0;
	line-height: 12px;
}
.food-content .rating-item .user .name{
	margin-right: 6px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.food-content .rating-item .user .avatar{
	height: 12px;
	width: 12px;
	border-radius: 50%;
}

.food-content .rating-item .time{
	margin-bottom:6px;
	font-size: 10px;
	line-height: 12px;
	color: rgb(147,153,159);
}
.food-content .rating-item .text{
	font-size: 12px;
	line-height: 16px;
	color: rgb(7,17,27);
}
.food-content .rating-item .text .icon-thumb_up,.food-content .rating-item .text .icon-thumb_down{
	margin-right: 4px;
	font-size: 12px;
	color: rgb(147,153,159);
}
.food-content .rating-item .text .icon-thumb_up{
	color: rgb(0,160,220);
}
</style>