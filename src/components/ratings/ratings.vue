<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star class="stars" :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star class="stars" :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="deliverytime">
						<span class="title">送达时间</span>
						<span class="text">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" @ratingType="selectFn" @contentToggle="toggleContent"> </ratingselect>
			<div class="rating-wrapper">
				<ul v-show="ratings && ratings.length">
					<li class="rating-item border1px" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28"/>
						</div>
						<div class="content">
							<span class="name">{{rating.username}}</span>
							<div class="star-wrapper">
								<star class="stars" :size="24" :score="rating.score"></star>
								<div class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend.length">
								<span :class="{'icon-thumb_up':rating.rateType===0  ,'icon-thumb_down':rating.rateType===1 }"></span>
								<span class="recommend-item" v-for="recommend in rating.recommend">{{recommend}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
				<div class="no-rating" v-show="!ratings || !ratings.length">暂无评价内容</div>
			</div>
		</div>
		<shopcart ref="shopcart"  :delivey-price="seller.deliveryPrice" :min-price="seller.minPrice"> </shopcart>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from "components/star/star"
import split from "components/split/split"
import ratingselect from 'components/ratingselect/ratingselect'
import {myformatDate} from 'components/commonjs/date.js'
import shopcart from 'components/shopcart/shopcart'

const POSITIVE = 0;
const NEGTIVE = 1;
const ALL =2;
const ERR_OK = 0;
export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			ratings:[],
			selectType:ALL,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'满意',
				negtive:'不满意'
			}
		}
	},
	mounted(){
		
		this.$http.get('/api/ratings').then((res)=>{
			var result = res.body;
			if(result.errno == ERR_OK){
				this.ratings = result.data;
				this.$nextTick(()=>{
					if(!this.rateScroll){
						this.rateScroll = new BScroll(this.$refs.ratings,{click:true});
					}else{
						this.rateScroll.refresh();
					}
				})
			}
		})
	},
	methods:{
		selectFn(type){
			this.selectType = type;
			this.$nextTick(()=>{
				this.rateScroll.refresh();
			});
		},
		toggleContent(onlyContent){
			this.onlyContent = onlyContent;
			this.$nextTick(()=>{
				this.rateScroll.refresh();
			});
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
	filters:{
		formatDate(time){
			var date = new Date(time);
			return myformatDate(date,"yyyy-MM-dd hh:mm");
		}
	},
	components:{
		star,
		split,
		ratingselect,
		shopcart
	}
}
</script>

<style>
.ratings{
	position: absolute;
	top:174px;
	bottom: 46px;
	width: 100%;
	overflow: hidden;
}
.ratings-content .overview{
	display: flex;
	padding:18px 0;
}
.ratings-content .overview .overview-left{
	flex:0 0 137px;
	width:137px;
	border-right: 1px solid rgba(7,17,27,0.1);
	text-align: center;
	padding-bottom:6px;
}
.ratings-content .overview .overview-left .score{ 
	margin-bottom:6px;
	font-size: 24px;
	line-height: 28px;
	color:rgb(255,153,0);
}
.ratings-content .overview .overview-left .title{ 
	margin-bottom:8px;
	font-size: 12px;
	line-height: 12px;
	color:rgb(7,17,27);
}
.ratings-content .overview .overview-left .rank{ 
	font-size: 10px;
	line-height: 10px;
	color:rgb(147,153,159);
}
.ratings-content .overview .overview-right{
	flex:1;
	padding-left:24px;
}
.ratings-content .overview .overview-right .score-wrapper{
	margin-bottom: 6px;
	font-size: 0;
}
.ratings-content .overview-right .score-wrapper .title{
	display: inline-block;
	vertical-align: middle;
	margin-right:12px;
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);
}
.ratings-content .overview-right .score-wrapper .stars{
	display: inline-block;
	vertical-align: middle;
	margin-right:12px;
}
.ratings-content .overview-right .score-wrapper .score{
	display: inline-block;
	vertical-align: middle;
	font-size: 12px;
	line-height: 18px;
	color: rgb(255,157,0);
}
.ratings-content .overview-right .deliverytime{
	font-size: 0;
}
.ratings-content .overview-right .deliverytime .title{
	margin-right:12px;
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);
}
.ratings-content .overview-right .deliverytime .text{
	font-size: 12px;
	line-height: 18px;
	color: rgb(147,153,159);
}
.ratings-content .rating-wrapper{
	padding:0 18px;
}
.ratings-content .rating-wrapper .rating-item{
	display: flex;
	padding: 16px 0;
	/*border-bottom:1px solid rgba(7,17,27,0.1)*/
}
.ratings-content .rating-item .avatar{
	flex:0 0 28px;
	height: 28px;
	width: 28px;
	border-radius: 50%;
	overflow: hidden;
}
.ratings-content .rating-item .content{
	position: relative;
	flex:1;
	padding-left: 12px;
}
.ratings-content .rating-item .content .name{
	margin-bottom: 4px;
	font-size: 10px;
	line-height: 16px;
	color: rgb(7,17,27);
}
.ratings-content .rating-item .content .star-wrapper{
	margin-bottom: 6px;
	font-size: 0;
}
.ratings-content .rating-item .content .star-wrapper .stars{
	display: inline-block;
	vertical-align: top;
	margin-right: 6px;
}
.ratings-content .rating-item .content .star-wrapper .delivery{
	display: inline-block;
	vertical-align: top;
	font-size: 10px;
	line-height: 12px;
	color: rgb(147,153,159);
}
.ratings-content .rating-item .content .text{
	margin-bottom: 8px;
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);
}
.ratings-content .rating-item  .content .recommend {
	font-size: 0;
	line-height: 16px;
}
.ratings-content .rating-item .recommend .icon-thumb_up,.ratings-content .rating-item .recommend .icon-thumb_down{
	margin-right: 8px;
	font-size: 12px;
	color: rgb(183,187,191);
}
.ratings-content .rating-item .recommend .icon-thumb_up{
	color: rgb(0,160,220);
}
.ratings-content .rating-item .recommend .recommend-item{
	display: inline-block;
	border:1px solid rgba(7,17,27,0.1);
	border-radius: 1px;
	padding:0 6px;
	margin-right: 8px;
	margin-bottom: 4px;
	font-size: 9px;
	color: rgb(147,153,159);
}
.ratings-content .rating-item .content .time{
	position: absolute;
	top: 0;
	right: 0;
	font-size: 10px;
	line-height: 12px;
	color: rgb(147,153,159);
}
.ratings-content .rating-wrapper .no-rating{
	padding:16px 0;
	font-size: 12px;
	color: rgb(147,153,159);
}
</style>