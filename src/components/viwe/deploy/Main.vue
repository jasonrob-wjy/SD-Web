<template>
	<Layout>
		<Sider :collapsed-width="78" :style="{background: '#fff'}">
			<Menu active-name="1-0" theme="light" width="auto">
				<MenuItem name="1-0" @click.native="menuQuery('')">
					<i class="fa fa-pie-component"></i>
					<span>全部 Web 项目</span>
				</MenuItem>
				<MenuItem v-for="(item,i) in typeArr" :key="i+'q'" :name="'1-'+(i+1)" @click.native="menuQuery(item)" >
					<i class="fa fa-pie-component"></i>
					<span>{{item}}</span>
				</MenuItem>
			</Menu>
		</Sider>
		<Layout>
			<div class="content-right">
				<Content ref="content" @on-reset="handleReset" @on-change="changePage" @on-page-size-change="changeSizePage"/>
			</div>
		</Layout>
	</Layout>
</template>

<script>
	import Content from "./module/Content";
	// import Details from "./module/Details";
	export default {
		name: "temmain",
		components: {
			Content
			// Details
		},
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				projectName: "",
				typeArr: [],
				paramsObj: {},

				// -------------------------
				// isCollapsed: false,

				// detail: { mark: false },

				// typeVal: "",
				// // content: [],
				// typeCount: 0,
				// classArr: []
			};
		},
		// computed: {
		// 	menuitemClasses: function() {
		// 		return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
		// 	}
		// },
		created() {
			this.getData();
		},
		mounted() {
			this.$event.on("on-success", e => {
				this.getData();
			});
		},
		methods: {
			handleReset(e){
				this.paramsObj = e;
				this.getData();
			},
			changePage(event) {
				this.pageNo = event;
				this.getData();
			},
			changeSizePage(event) {
				this.pageSize = event;
				this.getData();
			},
			menuQuery(val) {
				this.projectName = val;
				this.getData();
			},
			getData() {
				this.$Message.destroy();
				let data = {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				};

				if (this.projectName) {
					data.projectName = this.projectName;
				}

				if (this.paramsObj.author) {
					data.author = this.paramsObj.author
				}
				if (this.paramsObj.idDeployment) {
					data.idDeployment = this.paramsObj.idDeployment
				}
				if (this.paramsObj.version) {
					data.version = this.paramsObj.version
				}

				this.$axios
					.get("/api/deploy/edition/get", { params: data })
					.then(res => {
						if (res.data.result) {
							this.$refs.content.setData({
								content: res.data.list,
								total: res.data.total
							});
							this.typeArr = res.data.project;
							this.$store.commit("setSideList", this.typeArr);
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
			}

			// ----------------------------------
			// onDetail(obj) {
			// 	this.detail = obj;
			// },
			// onIsDetail(val) {
			// 	this.detail.mark = val;
			// 	this.getData({});
			// },
			// onQuery(obj, mark) {
			// 	this.detail.mark = false;
			// 	this.pageNo = 1;
			// 	if (mark) {
			// 		this.typeVal = obj;
			// 		this.getData({});
			// 	} else {
			// 		this.getData(obj);
			// 	}
			// },

			// setOneBugIsShow() {
			// 	this.$store.commit("setOneBugIsShow", true);
			// }
		}
	};
</script>
<style lang="scss">
	.ivu-layout-sider-children {
		overflow-y: auto;
	}
</style>
