<template>
	<div>
		<div class="query">
			<div class="select">
				<label>创建者</label>
				<Select v-model="authorVal" clearable @on-change="handleQuery" style="width:90px">
					<Option v-for="item in cityList1" :value="item.name" :key="item.name">{{ item.name }}</Option>
				</Select>
				<!-- <label>类别</label>
				<Select v-model="classVal" clearable @on-change="handleQuery" style="width:90px">
					<Option v-for="(item,i) in cityList3" :value="item" :key="i+'h'">{{ item }}</Option>
				</Select> -->
				<label>状态</label>
				<Select v-model="publishVal" clearable @on-change="handleQuery" style="width:90px">
					<Option v-for="(item,i) in cityList2" :value="item.value" :key="i+'s'">{{ item.name }}</Option>
				</Select>
			</div>
			<div class="search-mar">
				<Input
					v-model="titleVal"
					search
					enter-button
					@on-search="handleQuery"
					placeholder="请输入版本号..."
				/>
				<Button type="success" ghost @click.stop="setIsShow">+ 新建部署</Button>
			</div>
		</div>
		<div>
			<!-- # -->
			<div class="content">
				<Table border :columns="columns" :data="content">
					<template slot-scope="{ row }" slot="version">
						<span style="color: #FAB67B;">{{ row.version }}</span>
					</template>
					<template slot-scope="{ row }" slot="idDeployment">
						<span v-if="row.idDeployment=='yes'" style="color: #6CD1A7;">已部署</span>
						<span v-else style="color: #EC6C73;">未部署</span>
					</template>
					<template slot-scope="{ row }" slot="webUrl">
						<span
							v-if="row.idDeployment=='yes'"
							class="copy1"
							v-clipboard:copy="$url + row.webUrl"
							v-clipboard:success="onCopy"
							v-clipboard:error="onError"
						>复制链接</span>
						<span v-else class="copy2">复制链接</span>
						<!-- <a :href="$url + row.webUrl" target="_blank">{{  }}</a> -->
					</template>
					<template slot-scope="{ row }" slot="action">
						<Button
							v-if="row.idDeployment=='yes'"
							@click="handleShow(row)"
							type="success"
							size="small"
						>访问项目</Button>
						<Button v-else type="primary" size="small" @click="handleDeploy(row)">部署项目</Button>
					</template>
				</Table>
			</div>
			<div class="page">
				<Page
					class="page-warp"
					prev-text="上一页"
					next-text="下一页"
					show-elevator
					show-total
					:total="total"
					show-sizer
					@on-change="changePage"
					@on-page-size-change="changeSizePage"
				/>
			</div>
			<!-- <div class="load-more" @click="handleMore" v-if="mark">
				<p>
					<Icon type="ios-arrow-dropdown" size="18"/>
					<span>加载更多</span>
					<Icon type="ios-arrow-dropdown" size="18"/>
				</p>
			</div>
			<div v-else class="load-more">
				<p>
					<span>没有更多啦！</span>
				</p>
			</div>-->
		</div>
		<!-- 加载动画 -->
		<!-- <div v-else class="web-box demo-spin-col">
			<i class="fa fa-spinner fa-pulse"></i>
		</div>-->
		<!-- 新建Bug -->
		<AddComponent
			v-if="isOpen"
			:typeArr="typeArr"
			:classArr="cityList3"
			ref="addChart"
			@on-change="setIsShow"
		/>
	</div>
</template>

<script>
	import AddComponent from "./AddComponent";

	export default {
		name: "chartlist",
		components: {
			AddComponent
		},
		data: () => ({
			pageNo: 1,
			pageSize: 18,
			total: 10,
			columns: [
				{
					title: "项目名称",
					width: 220,
					key: "projectName"
				},
				{
					title: "项目版本",
					width: 100,
					slot: "version"
				},
				{
					title: "发布者",
					width: 130,
					key: "author"
				},
				{
					title: "状态",
					width: 100,
					slot: "idDeployment"
				},
				{
					title: "访问链接",
					width: 150,
					slot: "webUrl"
				},
				{
					title: "创建时间",
					width: 250,
					key: "time"
				},
				{
					title: "操作",
					slot: "action",
					width: 145
				}
			],
			data6: [
				{
					name: "John Brown",
					age: 18,
					address: "New York No. 1 Lake Park"
				}
			],
			content: [],
			itemData: [], //当前部署版本
			isOpen: true,

	cityList1: [],
			cityList2: [
				{ name: "已部署", value: "yes" },
				{ name: "未部署", value: "no" }
			],
		titleVal: "",
			authorVal: "",
			publishVal: "",
			// -----------------------------------------
			// isDetail: true,
			// mark: true,
			// author: "",
			// page: 1,
			typeArr: [],
		
			cityList3: [],
			// bid: "",
		
			classVal: "",
		
			// class: "", //通过类型判断 page 是否置1
	
			// bidData: {}
		}),
		props: {
			msg: String
		},
		mounted() {
			// this.author = this.$store.state.variable.user.name;
			// // this.getData();
			this.$event.on("on-success", e => {
				this.isOpen = false;
			});
			this.getUser();
		},
		methods: {
			setData(data) {
				this.content = data.content;
				this.itemData = data.content.filter(item => {
					return item.idDeployment == "yes";
				});
				this.total = data.total;
			},
			// 访问站点
			handleShow(e) {
				window.open(this.$url + e.webUrl);
			},
			//部署站点
			handleDeploy(e) {
				let uidArr = [];
				this.itemData.forEach(item => {
					if (item.projectName == e.projectName) {
						uidArr.push(item.bid);
					}
				});
				this.$Message.destroy();
				this.$Message.loading({
					content: "项目部署中，请稍后...",
					duration: 0
				});
				let data = {
					root: e.root,
					version: e.version,
					catalog: e.catalog,
					bid: e.bid,
					uidArr: JSON.stringify(uidArr)
				};
				this.$axios
					.post("/api/deploy/edition/transfer", this.$qs.stringify(data))
					.then(res => {
						this.$Message.destroy();
						if (res.data.result) {
							this.$Message["success"]({
								background: true,
								content: "项目部署成功！"
							});
							this.$emit("on-reset", {});
						} else {
							this.$Message["error"]({
								background: true,
								content: "项目部署失败！"
							});
						}
					})
					.catch(function(error) {
						this.$Message.destroy();
						this.$Message["error"]({
							background: true,
							content: "项目部署失败！"
						});
					});
			},
			changePage(event) {
				this.pageNo = event;
				this.$emit("on-change", event);
			},
			changeSizePage(event) {
				this.pageSize = event;
				this.$emit("on-page-size-change", event);
			},
			onChange() {},
			//编辑列表数据
			setIsShow() {
				this.isOpen = true;
				this.$event.emit("isOpenAdd", this.content[0]);
			},
			onCopy() {
				this.$Message.destroy();
				this.$Message["success"]({
					background: true,
					content: "复制成功！"
				});
			},
			onError() {
				this.$Message.destroy();
				this.$Message["success"]({
					background: true,
					content: "复制失败！"
				});
			},
			getUser() {
				this.$axios
					.get("/api/person/user")
					.then(res => {
						if (res.data.result) {
							this.cityList1 = res.data.data;
						} else {
							this.$Message["error"]({
								background: true,
								content: "数据请求失败！"
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
				handleQuery() {
				this.$emit("on-reset", {
					author: this.authorVal,
					idDeployment: this.publishVal,
					version: this.titleVal
				});
			},
			// -------------------------------------

			//使用相关
			// getBidData(bid) {
			// 	this.$Message.loading({
			// 		content: "加载中，请稍后...",
			// 		duration: 0
			// 	});
			// 	this.bid = bid;
			// 	this.$axios
			// 		.get("/api/template/component", { params: { bid } })
			// 		.then(res => {
			// 			if (res.data.result) {
			// 				this.bidData = res.data.content;
			// 				this.$emit("on-detail", { data: this.bidData, mark: true });
			// 			} else {
			// 				this.$Message["error"]({
			// 					background: true,
			// 					content: "数据请求失败！"
			// 				});
			// 			}
			// 			this.$Message.destroy();
			// 		});
			// },
		

			// //获取从父级传过来的列表数据
			// setData(data, type, mark, page, classArr) {
			// 	this.page = page;
			// 	this.mark = mark;
			// 	this.cityList3 = classArr;
			// 	this.typeArr = type.map(item => {
			// 		return item.type;
			// 	});
			// 	this.content = data;
			// },
			//路由跳转
			// handleRouter(bid) {

			//   // this.$router.push({
			//   //   path: "/components/details",
			//   //   query: { bid }
			//   // });
			// },
			//新建窗口关闭

			//分页查询
			// handleMore() {
			// 	this.page = this.page + 1;
			// 	this.$emit("on-page", this.page);
			// }
		}
	};
</script>

<style lang="scss" scoped>
	.copy1 {
		color: #fff;
		padding: 2px 10px;
		background: #f89866;
		border-radius: 5px;
		font-size: 13px;
		cursor: pointer;
	}
	.copy2 {
		color: #fff;
		font-size: 13px;
		padding: 2px 10px;
		background: rgba(129, 129, 129, 0.5);
		border-radius: 5px;
	}
	.query {
		background: #fcfcfc;
		padding: 10px 16px;
		box-shadow: 0 1px 0 0 #e3e9ed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.search-mar {
			display: flex;
			align-items: center;
			> button {
				margin-left: 20px;
			}
		}
		.select {
			display: flex;
			align-items: center;
			.ivu-select {
				margin-right: 20px;
			}
			label {
				padding: 5px 10px;
				background: #f7f9fa;
				height: 32px;
				border: 1px solid #dcdee2;
				border-right: 0px;
			}
		}
	}

	.load-more {
		text-align: center;
		padding: 15px 16px;
		margin-bottom: 20px;
		border-top: 1px solid #eee;
		cursor: pointer;
		span {
			font-size: 15px;
			margin: 0 5px;
		}
	}
	.load-more:hover {
		color: #19be6b;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		padding: 12px;
		.is_fb {
			color: #6cd1a7;
		}
		> div {
			margin: 7px;
			border-radius: 3px;
		}
		.jieshi {
			padding: 10px;
			border-top: 1px solid #efefef;
			> p {
				color: #2c3e50;
				span {
					height: 42px;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			> div {
				margin-bottom: 10px;
				.isBj {
					cursor: pointer;
					color: #19be6b;
				}
			}
		}

		.img-warp {
			box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
			width: 260px;
			.img-box {
				position: relative;
				width: 100%;
				height: 100%;
				padding: 2px;
				img {
					width: 100%;
					height: 175px;
				}
			}
			.shade {
				width: 100%;
				height: 100%;
			}
			.shade p {
				position: absolute;
				top: 0px;
				right: 0;
				left: 0;
				top: 0;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: all 0.3s ease;
				a {
					color: #fff;
					border: 1px solid #fff;
					border-radius: 5px;
					padding: 5px 12px;
					z-index: 10;
					transition: all 0.3s ease;
					transform: scale(0);
					margin: 18px;
				}
				a:nth-child(1) {
					background: #2db7f5;
				}
				a:nth-child(2) {
					background: #19be6b;
				}
			}
			.shade:hover p {
				background: rgba(253, 252, 252, 0.2);
				a {
					transform: scale(1);
				}
			}
			.no-publish {
				// opacity: 0.5;
				background-color: rgba(255, 255, 255, 0.5);
				span {
					color: #fff;
					opacity: 0.9;
					border: 1px solid #fff;
					background: #fa785e;
					border-radius: 5px;
					padding: 5px 12px;
				}
			}
		}
		.edit {
			display: flex;
			justify-content: space-between;
			border-top: 1px solid #efefef;
			padding: 10px;
			font-size: 14px;
			color: #aaa;
			span {
				// color: #fff;
				i {
					margin-right: 5px;
				}
			}
		}
		.author-img {
			display: flex;
			align-items: center;
			img {
				margin-right: 8px;
				width: 20px;
				height: 20px;
			}
		}
	}
	.page {
		padding-top: 25px;
		border-top: 1px solid #e8eaec;
		padding-bottom: 10px;
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}
</style>