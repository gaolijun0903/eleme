<template>
<div class="goods">
	<div class="menu-wrapper" ref="menuWrapper" >
		<ul>
			<li :class="{'current':currentIdx===idx}" v-for="(item,idx) in goods" @click="selectMenu(idx,$event)">
				<div class="menu-item border1px" >
					<span class="text">
						<span class="icon" :class="supportsType[item.type]" v-show="item.type>0"></span>{{item.name}}
					</span>
				</div>
			</li>
		</ul>
	</div>
	<div class="foods-wrapper" ref="foodsWrapper" >
		<ul>
			<li class="food-list food-list-hook" v-for="item in goods">
				<h1 class="title">{{item.name}}</h1>
				<ul>
					<li class="food-item border1px" v-for="food in item.foods">
						<div class="icon">
							<img :src="food.icon" width="57" height="57" />
						</div>
						<div class="content">
							<h2>{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span>月售{{food.sellCount}}份 </span>
								<span class="rating">好评率{{food.rating}}%</span>
							</div>
							<div class="price">
								<span class="newprice">
									￥{{food.price}}
								</span>
								<span class="oldprice" v-show="food.oldPrice">
									￥{{food.oldPrice}}
								</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food" v-on:cartadd="_drop"> </cartcontrol>
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	
  	<shopcart ref="shopcart" :selected-foods="selectedFoods" :delivey-price="seller.deliveryPrice" :min-price="seller.minPrice"> </shopcart>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'

const ERR_OK = 0;
export default{
	name:'goods',
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return {
			goods:[],
			listHeight:[],
			scrollY:0
		}
	},
	computed:{
		currentIdx(){
			for(let i=0; i<this.listHeight.length; i++){
				let h1= this.listHeight[i];
				let h2= this.listHeight[i+1];
				if(!h2 ||( this.scrollY<h2 && this.scrollY>=h1)){
					return i
				}
			}
			return 0
		},
		selectedFoods(){
			let foods= [];
			this.goods.forEach((item)=>{
				item.foods.forEach((food)=>{
					if(food.quantity){
					foods.push(food)
					}
				})
			})
			return foods
		}
	},
	mounted(){
		this.supportsType=["decrease","discount","special","invoice","guarantee"];
		this.$http.get('/api/goods').then((res)=>{
			var result = res.body;
			if(result.errno == ERR_OK){
				this.goods = result.data;
				this.$nextTick(()=>{
					this._initScroll();
					this.calculateHeight();
				})
			}
		})
	},
	methods:{
		_initScroll(){
			this.menuScroll = new BScroll(this.$refs.menuWrapper,{click:true});
			this.foodScroll = new BScroll(this.$refs.foodsWrapper,{probeType:3,click:true});
			this.foodScroll.on("scroll",(pos)=>{
				this.scrollY = Math.abs(Math.round(pos.y))
			})
		},
		calculateHeight(){
			let foodList = document.getElementsByClassName('food-list-hook');
			let height = 0;
			this.listHeight.push(height);
			for(let i=0; i<foodList.length; i++){
				height += foodList[i].clientHeight;
				this.listHeight.push(height);
			}
		},
		selectMenu(idx,ev){
			if(!ev._constructed){
				return
			}
			let foodList = document.getElementsByClassName('food-list-hook');
			let el = foodList[idx];
			this.foodScroll.scrollToElement(el,300)
		},
		_drop(el){
			this.$refs.shopcart.drop(el);
		}
	},
	components:{
		shopcart,
		cartcontrol
	}
}

</script>

<style>
.goods{
	display: flex;
	position: absolute;
	top:174px;
	bottom: 46px;
	width: 100%;
	overflow: hidden;
}
/*------ 左侧菜单 ----------*/
.goods .menu-wrapper{
	flex:0 0 80px;
	width: 80px;
	background-color: #f3f5f7;
}
.menu-wrapper .current{
	position: relative;
	background-color: #fff;
	top: -1px;
	font-weight: 700;
}
.menu-wrapper .current .menu-item:after{
	display: none;
}
.menu-wrapper .menu-item{
	display: table;
	margin: 0 auto;
	width:56px;
	height:54px;
	font-size: 0;
}
.menu-wrapper .menu-item .text{
	display: table-cell;
	vertical-align: middle;
	font-size:12px;
	line-height: 14px;
	margin-left: 2px;
}
.menu-wrapper .menu-item .icon{
	display:inline-block;
	vertical-align:top;
	width:12px;
	height:12px;
	background-size:100%;
	background-repeat:no-repeat;
}
.menu-wrapper .decrease{
	background-image:url(decrease_1@2x.png);
}
.menu-wrapper .discount{
	background-image:url(discount_1@2x.png);
}
.menu-wrapper .guarantee{
	background-image:url(guarantee_1@2x.png);
}
.menu-wrapper .invoice{
	background-image:url(invoice_1@2x.png);
}
.menu-wrapper .special{
	background-image:url(special_1@2x.png);
}
/*------ 左侧菜单END ----------*/
/*------ 右侧商品 ----------*/
.goods .foods-wrapper{
	flex:1;
}
.foods-wrapper .food-list .title{
	height: 26px;
	padding-left:12px;
	background-color:#f3f5f7;
	border-left:2px solid #d9dde1;
	font-size:12px;
	line-height: 26px;
	color:rgb(147,153,159);
}

.foods-wrapper .food-list .food-item{
	display:flex;
	margin:18px 18px 0 18px;
	padding-bottom:18px;
}
.foods-wrapper .food-list .food-item:last-child:after{
	display: none;
}
.foods-wrapper .food-item .icon{
	flex:0 0 57px;
	margin-right:10px;
}
.foods-wrapper .food-item .content{
	flex:1;
}
.foods-wrapper .content h2{
	font-size:14px;
	line-height:14px;
	color:rgb(7,17,27);
	margin:2px 0 8px 0;
}
.foods-wrapper .content .desc{
	font-size:10px;
	line-height:16px;
	color:rgb(147,153,159);
	margin-bottom: 8px;
}
.foods-wrapper .content .extra{
	font-size:10px;
	line-height:10px;
	color:rgb(147,153,159);
	margin-bottom: 4px;
}
.foods-wrapper .extra .rating{
	margin-left:12px;
}
.foods-wrapper .content .cartcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 12px;
}
.foods-wrapper .content .newprice{
	font-size:10px;
	line-height:24px;
	font-weight:700;
	color:rgb(240,20,20);
}
.foods-wrapper .content .oldprice{
	font-size:10px;
	line-height:24px;
	font-weight:700;
	color:rgb(147,153,159);
	text-decoration: line-through;
	margin-left: 8px;
}




/*------ 右侧商品END ----------*/
</style>