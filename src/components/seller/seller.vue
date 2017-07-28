<template>
<div class="seller" ref="seller">
	<div class="seller-content">
		<div class="name-wrapper">
			<div class="name border1px">
				<h1 class="title">{{seller.name}}</h1>
				<div class="sold">
					<star class="stars" :size="36" :score="seller.score"></star>
					<span class="ratingCount">({{seller.ratingCount}})</span>
					<span class="sellCount">月售{{seller.sellCount}}单</span>
				</div>
				<div class="likes" @click="toggleFavorite">
					<i class="icon-favorite" :class="{'favorite':favorite}"></i>
					<div class="text">{{favoriteText}}</div>
				</div>
			</div>
			<div class="delivery">
				<div class="block">
					<div class="text">起送价</div>
					<div class="price">
						<span class="num">{{seller.minPrice}}</span>
						<span class="extra">元</span>
					</div>
				</div>
				<div class="block">
					<div class="text">商家配送</div>
					<div class="price">
						<span class="num">{{seller.deliveryPrice}}</span>
						<span class="extra">元</span>
					</div>
				</div>
				<div class="block">
					<div class="text">平均配送时间</div>
					<div class="price">
						<span class="num">{{seller.deliveryTime}}</span>
						<span class="extra">分钟</span>
					</div>
				</div>
			</div>
		</div>
		<split></split>
		<div class="bulletin">
			<h1 class="title">公告与活动</h1>
			<p class="text border1px">{{seller.bulletin}}</p>
			<ul class="supports" v-if="seller.supports">
				<li class="support-item border1px" v-for="support in seller.supports">
					<span class="icon" :class="supportsType[support.type]"></span>
					<span class="description">{{support.description}}</span>
				</li>
			</ul>
		</div>
		<split></split>
		<div class="pics">
			<div class="title">商家实景</div>
			<div class="pics-wrapper" ref="picsScroll">
				<ul class="pics-list" ref="picsList">
					<li class="pics-item" v-for="pic in seller.pics">
						<img :src="pic" width="120" height="90" />
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<div class="infos">
			<div class="title border1px">商家信息</div>
			<ul>
				<li class="info-item border1px" v-for="info in seller.infos">
					{{info}}
				</li>
			</ul>
		</div>
		
	</div>
	<shopcart ref="shopcart"  :delivey-price="seller.deliveryPrice" :min-price="seller.minPrice"> </shopcart>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from "components/star/star"
import split from "components/split/split"
import shopcart from 'components/shopcart/shopcart'
import {saveToLocal,loadFromLocal} from "components/commonjs/store.js"
	
export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			favorite:(()=>{
				return loadFromLocal(this.seller.id, 'favorite', false);
			})(),
			supportsType:["decrease","discount","special","invoice","guarantee"]
		}
	},
	computed:{
		favoriteText(){
			return this.favorite ? "已收藏" : "收藏"
		}
	},
	mounted(){
		this.$nextTick(()=>{
			if(!this.sellerScroll){
				this.sellerScroll = new BScroll(this.$refs.seller,{click:true});
			}else{
				this.sellerScroll.refresh();
			}
		});
		if(this.seller.pics){
			let picWidth = 120;
			let margin = 6;
			let w = (picWidth+margin)*this.seller.pics.length-margin;
			this.$refs.picsList.style.width = w+'px';
			this.$nextTick(()=>{
				if(!this.picsScroll){
					this.picsScroll = new BScroll(this.$refs.picsScroll,{scrollX:true,eventPassthrough:'vertical'});
				}else{
					this.picsScroll.refresh();
				}
			})
		}
	},
	methods:{
		toggleFavorite(ev){
			if(ev._consructed){
				return;
			}
			this.favorite = !this.favorite;
			saveToLocal(this.seller.id, 'favorite',this.favorite)
		}
	},
	components:{
		star,
		split,
		shopcart
	}
}
</script>

<style>
.seller{
	position: absolute;
	top:174px;
	bottom: 46px;
	width: 100%;
	overflow: hidden;
}
.seller .seller-content {
	padding-bottom: 18px;
}
.seller .seller-content .name{
	position: relative;
	margin: 18px 18px 0 18px;
	padding-bottom: 18px;
}
.seller .seller-content .name .title{
	margin-bottom: 8px;
	font-size: 14px;
	line-height: 14px;
	color: rgb(7,17,27);
}
.seller .seller-content .name .sold{
	font-size: 0;
	line-height: 18px;
}
.seller .seller-content .name .sold .stars{
	display: inline-block;
	vertical-align: top;
	margin-right: 8px;
}
.seller .seller-content .name .sold .ratingCount{
	display: inline-block;
	vertical-align: top;
	margin-right: 12px;
	font-size: 10px;
	color: rgb(77,85,93);
}
.seller .seller-content .name .sold .sellCount{
	display: inline-block;
	vertical-align: top;
	font-size: 10px;
	color: rgb(77,85,93);
}

.seller .seller-content .name .likes{
	position: absolute;
	top: 0;
	right: 0;
	width:50px;
	text-align: center;
}
.seller .seller-content .name .likes .icon-favorite{
	display: block;
	margin-bottom: 4px;
	font-size: 24px;
	line-height: 24px;
	color: #d4d6d9;
}
.seller .seller-content .name .likes .favorite{
	color: rgb(240,20,20);
}
.seller .seller-content .name .likes .text{
	font-size: 10px;
	line-height: 10px;
	color: rgb(77,85,93);
}
.seller .seller-content .delivery{
	display: flex;
	padding: 18px 0;
}
.seller .seller-content .delivery .block{
	flex: 1;
	border-right: 1px solid rgba(7,17,27,0.1);
	text-align: center;
}
.seller .seller-content .delivery .block .text{
	margin-bottom: 4px;
	font-size: 10px;
	line-height: 10px;
	color: rgb(147,153,159);
}
.seller .seller-content .delivery .block .price .num{
	font-size: 24px;
	line-height: 24px;
	color: rgb(7,17,27);
}
.seller .seller-content .delivery .block .price .extra{
	font-size: 10px;
	line-height: 10px;
	color: rgb(7,17,27);
}
.seller .seller-content .bulletin{
	margin: 18px 18px 0 18px;
}
.seller .seller-content .bulletin .title{
	margin-bottom: 8px;
	font-size: 14px;
	line-height: 14px;
	color: rgb(7,17,27);
}
.seller .seller-content .bulletin .text{
	padding: 0 12px 16px 12px;
	font-size: 12px;
	line-height: 24px;
	color: rgb(240,20,20);
}
.seller .seller-content .bulletin .supports .support-item{
	padding: 16px 12px;
	font-size: 0;
}
.seller .seller-content .bulletin .supports .support-item:last-child:after{
	display: none;
}
.seller .seller-content .bulletin .supports .support-item .description{
	display:inline-block;
	vertical-align:top;
	margin-left: 6px;
	font-size: 12px;
	line-height: 16px;
	color: rgb(7,17,27);
}
.support-item .icon{
	display:inline-block;
	vertical-align:top;
	width:16px;
	height:16px;
	background-size:100%;
	background-repeat:no-repeat;
}
.support-item .decrease{
	background-image:url(decrease_1@2x.png);
}
.support-item .discount{
	background-image:url(discount_1@2x.png);
}
.support-item .guarantee{
	background-image:url(guarantee_1@2x.png);
}
.support-item .invoice{
	background-image:url(invoice_1@2x.png);
}
.support-item .special{
	background-image:url(special_1@2x.png);
}

.seller .pics{
	padding: 18px;
}
.seller .pics .title{
	margin-bottom: 12px;
	font-size: 14px;
	line-height: 14px;
	color: rgb(7,17,27);
}
.seller .pics .pics-wrapper{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
}
.seller .pics .pics-wrapper .pics-list{
	font-size: 0;
}
.seller .pics .pics-wrapper .pics-list .pics-item{
	display: inline-block;
	margin-right: 6px;
	width: 120px;
	height: 90px;
}
.seller .pics .pics-wrapper .pics-list .pics-item:last-child{
	margin-right: 0;
}

.seller .infos{
	margin:18px 18px 0 18px;
}
.seller .infos .title{
	padding-bottom: 12px;
	font-size: 14px;
	line-height: 14px;
	color: rgb(7,17,27);
}
.seller .infos .info-item{
	padding: 16px 12px;
	font-size: 12px;
	line-height: 16px;
	color:rgb(7,17,27);
}
.seller .infos .info-item:last-child:after{
	display: none;
}
</style>