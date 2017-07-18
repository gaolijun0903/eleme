<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="desc">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon" :class="supportsType[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>	
		</div>
		<div class="bulletin-wrapper"  @click="showDetail">
			<span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="">
		</div>
	<transition name="fade">
		
	
		<div class="detail" v-show="detailShow">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="support" v-if="seller.supports">
						<li v-for="support in seller.supports">
							<span class="icon" :class="supportsType[support.type]"></span>
							<span class="text">{{support.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<div class="bulletin-text">
							{{seller.bulletin}}
						</div>
					</div>
					
				</div>
			</div>
			<div class="detail-close" @click="hideDetail">
				<i class="icon-close"></i>
			</div>
		</div>
	</transition>
	
	</div>
</template>

<script>
	import star from "components/star/star"
	export default {
		props: {
			seller:{type:Object}
		},
		data() {
			return {
				supportsType:["decrease","discount","special","invoice","guarantee"],
				detailShow:false
			}
		},
		methods:{
			showDetail(){
				this.detailShow=true
			},
			hideDetail(){
				this.detailShow=false
			}
		},
		components:{
			star
		}
	}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

.header{
	position: relative;
	overflow: hidden;
	color:#fff;
	background-color:rgba(7,17,27,0.5);
}
.content-wrapper{
	position:relative;
	padding:24px 12px 18px 24px;
	font-size:0;
}
.content-wrapper .avatar{
	display:inline-block;
	vertical-align:top;
}
.content-wrapper .avatar img{
	border-radius: 2px;
}
.content-wrapper .content{
	display:inline-block;
	margin-left:16px;
}
.content-wrapper .content .title{
	margin:2px 0 8px 0;
}
.content-wrapper .title .brand{
	display:inline-block;
	vertical-align:top;
	width:30px;
	height:18px;
	background-image:url(brand@2x.png);
	background-size:100%;
	background-repeat:no-repeat;
}
.content-wrapper .title .name{
	margin-left:6px;
	font-size:16px;
	line-height:18px;
	font-weight:bold;
}
.content-wrapper .content .desc{
	margin-bottom:10px;
	font-size:12px;
	line-height:12px;
}
.content-wrapper .content .support{
	margin-bottom:2px;
}
.content-wrapper .support .icon{
	display:inline-block;
	vertical-align:top;
	width:12px;
	height:12px;
	background-size:100%;
	background-repeat:no-repeat;
}
.support .decrease{
	background-image:url(decrease_1@2x.png);
}
.support .discount{
	background-image:url(discount_1@2x.png);
}
.support .guarantee{
	background-image:url(guarantee_1@2x.png);
}
.support .invoice{
	background-image:url(invoice_1@2x.png);
}
.support .special{
	background-image:url(special_1@2x.png);
}

.content-wrapper .support .text{
	margin-left:4px;
	font-size:10px;
	line-height:12px;
}
.content-wrapper .support-count{
	position:absolute;
	right:12px;
	bottom:18px;
	height:24px;
	padding:0 8px;
	text-align: center;
	background-color:rgba(0,0,0,0.2);
	border-radius:14px;
}
.content-wrapper .support-count .count{
	font-size:10px;
	line-height:24px;
	vertical-align:top;
}
.content-wrapper .support-count .icon-keyboard_arrow_right{
	margin-left:2px;
	font-size:10px;
	line-height: 24px;
}

.bulletin-wrapper{
	position: relative;
	height:28px;
	padding:0 22px 0 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
	background:rgba(7,17,27,0.2);
}
.bulletin-wrapper .bulletin-icon{
	display:inline-block;
	vertical-align: top;
	margin-top:8px;
	width:22px;
	height:12px;
	background-image:url(bulletin@2x.png);
	background-size:100%;
	background-repeat:no-repeat;
}
.bulletin-wrapper .bulletin-text{
	margin:0 4px;
	font-size:10px;
	line-height:28px;
}
.bulletin-wrapper .icon-keyboard_arrow_right{
	position:absolute;
	right:12px;
	font-size:10px;
	line-height:28px;
}
.background{
	position: absolute;
	left: 0;
	top:0;
	width: 100%;
	height:100%;
	z-index: -1;
	filter:blur(10px);
}
.background img{
	width: 100%;
	height:100%;
}
.detail{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	width: 100%;
	height:100%;
	overflow: auto;
	background: rgba(7,17,27,0.8);
	backdrop-filter:blur(10px);  /*只有苹果手机有此效果*/
}
.detail .detail-wrapper{
	width: 100%;
	min-height: 100%;
}
.detail .detail-wrapper .detail-main{
	margin-top:64px;
	padding-bottom:64px;
	
}
.detail .detail-main .name{
	font-size: 16px;
	font-weight: 700;
	line-height: 16px;
	text-align: center;
}
.detail .detail-main .star-wrapper{
	margin:16px 0 0 0;
	text-align: center;
}
.detail .detail-main .title{
	display:flex;
	width:80%;
	margin:28px auto 24px;
}
.detail .title .line{
	flex:1;
	position:relative;
	top: -7px;
	border-bottom: 1px solid rgba(255,255,255,0.2);
}
.detail .title .text{
	padding:0 12px;
	font-size:14px;
	font-weight: 700;
}
.detail .detail-main .support{
	width:80%;
	margin: 0 auto;
}
.detail .support li{
	padding:0 12px;
	margin-bottom: 12px;
	font-size: 0;
}
.detail .support li:last-child{
	margin-bottom: 0;
}
.detail .support .icon{
	display:inline-block;
	vertical-align:top;
	width:16px;
	height:16px;
	background-size:100%;
	background-repeat:no-repeat;
}
.detail .support .text{
	margin-left:6px;
	font-size:12px;
	line-height:16px;
}
.detail .detail-main .bulletin{
	width:80%;
	margin: 0 auto;
}
.detail .bulletin .bulletin-text{
	font-size:12px;
	line-height: 24px;
	padding:0 12px;
}
.detail .detail-close{
	position: relative;
	width: 32px;
	height: 32px;
	margin: -64px auto 0;
}
.detail .detail-close .icon-close{
	font-size: 32px;
}
</style>