<template>
	<section>
		<div class="home-header">
			<div class="logo">大数据部</div>
		</div>
		<div class="content-box">
			<ul>
				<li>Gitlab</li>
				<li>Jenkins</li>
				<li>jira</li>
				<li>Confluence</li>
			</ul>
		</div>
		<div class="footer-box" @mouseover="mouseOver" @mouseleave="mouseLeave">
			<swiper :options="swiperOption" ref="mySwiper">
				<!-- slides -->
				<swiper-slide>
					<img src="http://zhenglinglu.cn/banner/img2.jpg" alt />
				</swiper-slide>
				<swiper-slide>
					<img src="http://zhenglinglu.cn/banner/img2.jpg" alt />
				</swiper-slide>
				<swiper-slide>
					<img src="http://zhenglinglu.cn/banner/img2.jpg" alt />
				</swiper-slide>
				<swiper-slide>
					<img src="http://zhenglinglu.cn/banner/img2.jpg" alt />
				</swiper-slide>
				<swiper-slide>
					<img src="http://zhenglinglu.cn/banner/img2.jpg" alt />
				</swiper-slide>
				<swiper-slide>
					<img src="http://zhenglinglu.cn/banner/img2.jpg" alt />
				</swiper-slide>
				<swiper-slide>
					<img src="http://zhenglinglu.cn/banner/img2.jpg" alt />
				</swiper-slide>
				<!-- Optional controls -->
				<!-- <div class="swiper-pagination" slot="pagination"></div> -->
				<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
				<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
				<!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
			</swiper>
		</div>
	</section>
</template>

<script>
	import ProjectList from "./module/ProjectList";
	import Trends from "./module/Trends";
	import Operation from "./module/Operation";
	import Member from "./module/Member";

	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import "../../../../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.min.css";
	export default {
		name: "home",
		components: {
			ProjectList,
			Trends,
			Operation,
			Member,
			swiper,
			swiperSlide
		},
		data: () => ({
			imgurl: "",
			swiperOption: {
				effect: "coverflow",
				grabCursor: true,
				slidesPerView: "auto",
				coverflowEffect: {
					rotate: 10,
					stretch: 30,
					depth: 60,
					modifier: 2,
					slideShadows: true
				},
				loop: true,
				autoplay: {
					delay: 1000,
					disableOnInteraction: false
				},
				pagination: {
					el: ".swiper-pagination",
					type: "fraction"
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			}
		}),
		props: {
			msg: String
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		// watch: {
		// 	info(val) {
		// 		let author = val;
		// 		this.imgurl = author.url;
		// 	}
		// },
		mounted() {
			// let author = this.$store.state.user.info;
			// this.imgurl = author.url;

			// current swiper instance
			// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
			console.log("this is current swiper instance object", this.swiper);
			/*鼠标移入停止轮播，鼠标离开 继续轮播*/
		},
		methods: {
			mouseOver() {
				this.swiper.autoplay.stop();
			},
			mouseLeave() {
				this.swiper.autoplay.start();
			}
		}
	};
</script>
<style lang="scss" scoped>
	section {
		height: 100%;
		color: #fff;
		.home-header {
			z-index: 1;
			padding: 0 30px;
			border-bottom: 1px solid rgba(255, 255, 255, 0.589);
			display: flex;
			justify-content: center;
			padding: 10px 0;
			.logo {
				font-family: "Montserrat", Helvetica, Arial, sans-serif;
				font-size: 23px;
			}
		}
		.content-box {
			display: flex;
			justify-content: center;
			ul {
				display: flex;
				justify-content: center;
        li{
          padding: 5px 17px;
          border: 1px solid rgba(255, 255, 255, 0.623);
          margin: 10px;
          
        }
			}
		}
		.footer-box {
			height: 100px;
			bottom: 60px;
			right: 0;
			left: 0;
			position: fixed;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>

<style lang="scss">
	body {
		background: url("../../../assets/bgc.jpg") center center no-repeat;
		background-size: cover;
	}
	body::before {
		content: "";
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: -1;
	}
	.swiper-slide {
		width: 257px;
		height: 150px;
	}
</style>