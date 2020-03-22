<template>
	<div class="edition-warp">
		<div class="left">
			<div class="menu">
				<div class="me-left"></div>
				<ol class="me-right">
					<li @click="handleTab('a')" :class="[action==='a'?'action':'']">代码编辑</li>
					<li @click="handleTab('c')" :class="[action==='c'?'action':'']">API编辑</li>
					<li @click="handleTab('b')" :class="[action==='b'?'action':'']">使用说明</li>
				</ol>
			</div>
			<div class="tab">
				<ul>
					<li v-show="action==='a'">
						<AceEditor :content="option" lang="javascript" @on-change="onOptionChange"/>
					</li>
					<li v-show="action==='c'">
						<AceEditor :content="data" ref="dataEditor" lang="javascript" @on-change="onDataChange"/>
					</li>
					<li v-show="action==='b'" class="sysm">
						<div>
							<h3>后台接口默认返回如下三种数据格式（字段不同）：</h3>
							<pre>
    后台返回数据格式：
    {
        "result": true,
        "code": 200,
       <span
	class="code"
>"content": &lt; Object||Array ></span>
    }
    
    前台获取返回数据：
   <span class="code">let data = res.data.content</span>  
            </pre>或者：
							<pre>
    后台返回数据格式：
    {
        "result": true,
        "code": 200,
       <span
	class="code"
>"data": &lt; Object||Array ></span> 
    }    

    前台获取返回数据：
   <span class="code">let data = res.data.data</span>  
           </pre>或者：
							<pre>
    后台返回数据格式：
    {
        "result": true,
        "code": 200,
       <span
	class="code"
>"list": &lt; Object||Array ></span> 
        
    }    

    前台获取返回数据：
   <span class="code">let data = res.data.list</span>  
            </pre>
						</div>
						<div v-if="explain">
							<h3>图谱相关说明：</h3>
							<div v-html="explain"></div>
						</div>
					</li>
				</ul>
			</div>
			<!-- 按钮 -->
			<div class="handle-box">
				<div class="button">
					<!-- <span @click="onOptionChange(false)">
            <Icon type="ios-play-outline" size="20" />
            <span>运行</span>
					</span>-->
					<!-- <span>
            <Icon type="ios-cloud-upload-outline" size="18" />
            <span>保存</span>
					</span>-->

					<span @click="getBidData">
						<Icon type="ios-refresh" size="20"/>
						<span>重置</span>
					</span>
				</div>
			</div>
		</div>

		<div class="right">
			<div class="title">
				<!-- <span>{{title}} 展示</span> -->
				<div>
					<span>主题选择：</span>
					<Select v-model="themeType" clearable @on-change="handleQuery" style="width:100px;">
						<Option v-for="item in themeList" :value="item.name" :label="item.name" :key="item.name">
							<div class="clor-box">
								<i v-for="(each,i) in item.colorArr" :key="i+'f'" :style="'background:'+each+';'"></i>
								<span>{{item.name}}</span>
							</div>
						</Option>
					</Select>
				</div>

				<div>
					数据请求地址：
					<label>方式</label>
					<Select v-model="urlType" value="GET" style="width:75px;">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<Tooltip max-width="330" placement="bottom-start">
						<Input
							v-model="urlValue"
							clearable
							@on-focus="urlOnFocus"
							@on-blur="urlOnBlur"
							placeholder="请输入请求地址..."
							style="width: 260px"
						/>
						<div slot="content">
							<p style="margin:10px 0;">
								★ 返回数据可在左侧的
								<span class="code" @click="handleTab('c')">API编辑</span>中查看编辑。
							</p>
							<p style="margin:10px 0;">
								★ 详情请查看左侧的
								<span class="code" @click="handleTab('b')">使用说明</span>。
							</p>
						</div>
					</Tooltip>

					<Button type="info" ghost @click="getUrlData">确定</Button>
					<Button type="success" ghost @click="handleClear">重置</Button>
				</div>
			</div>
			<EchartsTemplate ref="template"/>
			<!-- 左侧抽屉 主题样式 -->
			<!-- <Drawer
        title="主题选择"
        :closable="true"
        :mask-style="{background: 'transparent'}"
        :draggable="true"
        v-model="drawer"
      >
        <RadioGroup v-model="vertical" vertical>
          <Radio label="apple">
            <Icon type="social-apple"></Icon>
            <span>Apple</span>
          </Radio>
          <Radio label="android">
            <Icon type="social-android"></Icon>
            <span>Android</span>
          </Radio>
          <Radio label="windows">
            <Icon type="social-windows"></Icon>
            <span>Windows</span>
          </Radio>
        </RadioGroup>
			</Drawer>-->
			<!-- 按钮 -->
			<div class="handle-box">
				<div class="button">
					<!-- <span>
            <Icon type="ios-cloud-download-outline" size="18" />
            <span>下载</span>
          </span>
          <span @click="handleDrawer">
            <Icon type="md-options" size="16" />
            <span>主题</span>
					</span>-->
					<span @click="handleRouter">
						<Icon type="ios-redo-outline" size="20"/>
						<span>返回</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import EchartsTemplate from "./module/EchartsTemplate";
	import AceEditor from "./module/AceEditor";
	export default {
		name: "jsedition",
		components: {
			EchartsTemplate,
			AceEditor
		},
		data: () => ({
			drawer: false,
			vertical: "apple",
			split: 0.35,
			action: "a",
			html: "",
			urlType: "GET",
			urlValue: "",
			tooltipContent: "",
			themeList: [],
			themeType: "",
			cityList: [
				{
					label: "GET",
					value: "GET"
				},
				{
					label: "POST",
					value: "POST"
				}
			],

			title: "",
			type: "",
			look: 1,
			author: "",
			option: "",
			theme: "",
			data: "",
			imgSrc: "",
			url: "",
			explain: "",
			bid: "",
			date: "",
			chartClass: "0"
		}),
		props: {
			msg: String
		},
		// computed:{
		//   offset(){
		//     return this.$refs.splits.$data.offset
		//   }
		// },
		watch: {
			// themeType(val) {
			// }
		},
		created() {
			this.tooltipContent = `返回的数据可以在左侧 API编辑 中查看或编辑。`;
		},
		mounted() {
			this.bid = this.$route.query.bid;
			this.getBidData();
			this.getThemeName();
		},
		methods: {
			// 获取某个主题
			getTheme(name) {
				this.themeList.forEach(item => {
					if (item.name === name) {
						this.theme = item;
						this.themeType = name;
						this.onThemeChange(item);
					}
				});
			},
			// 获取所有主题
			getThemeName() {
				this.$axios
					.get("/api/chart/theme")
					.then(res => {
						let data = res.data.data;
						this.themeList = data.map(item => {
							item.colorArr = JSON.parse(item.color).slice(0, 5);
							return item;
						});
					})
					.catch(error => {
						console.log(error);
						this.$Message["error"]({
							background: true,
							content: "主题加载错误！"
						});
					});
			},
			// 数据请求地址相关函数
			urlOnFocus() {
				if (!this.urlValue) {
					this.urlValue = "http://";
				}
			},
			urlOnBlur() {
				if (this.urlValue === "http://") {
					this.urlValue = "";
				}
			},
			handleClear() {
				this.action = "a";
				this.urlValue = "";
			},

			getUrlData() {
				this.$Message.destroy();
				this.action = "c";
				if (this.urlType === "GET") {
					this.$axios
						.get(this.urlValue)
						.then(res => {
							this.handleData(res);
						})
						.catch(error => {
							console.log(error);
							this.$Message["error"]({
								background: true,
								content: "请输入正确的请求地址！"
							});
						});
				} else {
					this.$axios
						.post(this.urlValue)
						.then(res => {
							this.handleData(res);
						})
						.catch(error => {
							console.log(error);
							this.$Message["error"]({
								background: true,
								content: "请输入正确的请求地址！"
							});
						});
				}
			},
			handleData(res) {
				this.$Message.destroy();
				let data = res.data;
				if (data) {
					this.$Message["success"]({
						background: true,
						content: "数据请求成功！"
					});
					if (data.list) {
						data = data.list;
					} else if (data.data) {
						data = data.data;
					} else if (data.content) {
						data = data.content;
					} else {
						this.$Message["error"]({
							background: true,
							content: "数据格式错误！可在左侧 Api编辑 处手动修正！"
						});
					}
					let objStr = JSON.stringify(data, null, 4);
					objStr = `let data = ` + objStr;
					this.$refs.dataEditor.setData(objStr);
				} else {
					this.$Message["error"]({
						background: true,
						content: "返回数据为空！"
					});
				}
			},
			// handleClear() {
			//   this.bid = "";
			//   this.title = "";
			//   this.type = "";
			//   this.author = "zll";
			//   this.option = "";
			//   this.data = "";
			//   this.url = "";
			//   this.imgSrc = "";
			//   this.explain = "";
			//   this.bid = "";
			//   this.date = "";
			//   this.chartClass = "0";
			// },
			getBidData() {
				this.$Message.destroy();
				this.themeType = "";
				this.$axios
					.get("/api/template/chart", { params: { bid: this.bid } })
					.then(res => {
						if (res.data.result) {
							let content = res.data.content;
							this.title = content.title;
							this.type = content.type;
							this.option = content.option;
							this.data = content.data;
							this.theme = content.theme;
							this.imgSrc = content.imgSrc;
							this.chartClass = content.chartClass;
							this.explain = content.explain;

							// this.$Message["success"]({
							//   background: true,
							//   content: "数据请求成功！"
							// });
							// this.$refs.template.setChart(this.option, this.data);
						} else {
							this.$Message["error"]({
								background: true,
								content: "数据请求失败！"
							});
						}
					});
			},

			// option
			onOptionChange(data) {
				this.option = data ? data : this.option;
				this.$refs.template.setChart(this.option, this.data, this.theme);
			},
			// theme
			onThemeChange(data) {
				if (this.themeType) {
					let index = this.option.indexOf("\noption.color");
					this.option =
						this.option.slice(0, index) + `\noption.color = ${data.color};`;
				}
				this.$refs.template.setChart(this.option, this.data, this.theme);
			},
			// data
			onDataChange(data) {
				this.data = data ? data : this.data;
				this.$refs.template.setChart(this.option, this.data, this.theme);
			},

			handleQuery(val) {
				if (val) {
					this.getTheme(val);
				} else {
					this.getBidData();
				}
			},
			handleTab(val) {
				this.action = val;
			},
			handleRouter() {
				this.$router.push({ path: "/charts" });
			},
			handleDrawer() {
				this.drawer = !this.drawer;
			}
		}
	};
</script>
<style lang="scss" scoped>
	.edition-warp {
		display: flex;
		height: 100%;
		font-size: 14px;
		.left {
			width: 35%;
			height: 100%;
			border-right: 3px solid #ccc;
			position: relative;
			.menu {
				display: flex;
				justify-content: space-between;
				background-color: #ebebeb;
				margin-top: 1px;
				.me-left {
					width: 47px;
					border: 1px solid #ccc;
				}
				.me-right {
					width: calc(100% - 47px);
					display: flex;
					//  box-shadow: 0 1px 3px rgba(26,26,26,.1);
					li {
						width: 33.3%;
						padding: 11.5px 0;
						text-align: center;
						border: 1px solid #ccc;
						cursor: pointer;
					}
					li.action {
						border: 0px;
						color: #19be6b;
						background-color: #fff;
					}
				}
			}
			li,
			ul {
				height: 100%;
			}
			.tab {
				height: calc(100% - 50px);
				ul {
					overflow-y: auto;
				}
			}
			.handle-box {
				top: 60px;
				right: 32px;
			}
		}

		.left:hover,
		.right:hover {
			.button {
				> span {
					opacity: 0.5;
				}
				> span:hover {
					opacity: 1;
				}
			}
		}

		.right {
			width: 65%;
			// height: calc(100% - 36px);

			// display: flex;
			// justify-content: center;
			// align-items: center;
			background-color: #fff;
			position: relative;
			.handle-box {
				top: 55px;
				right: 32px;
			}
			.title {
				background: #fcfcfc;
				padding: 6px 16px;
				background-color: #ebebeb;
				margin-top: 1px;
				border: 1px solid #ccc;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24px;
				> div {
					display: flex;
					align-items: center;
					.ivu-input-wrapper {
						margin-right: 10px;
					}
					label {
						padding: 5px 10px;
						background: #f7f9fa;
						height: 32px;
						border: 1px solid #dcdee2;
						border-right: 0px;
					}
					button {
						margin: 0 5px;
					}
				}
			}
		}

		.handle-box {
			position: absolute;
			z-index: 10;
		}
		.button {
			display: flex;
			> span {
				display: flex;
				align-items: center;
				font-size: 12px;
				border: 1px solid #ccc;
				color: #aaa;
				padding: 2px 6px;
				margin-left: 10px;
				border-radius: 3px;
				opacity: 0;
				cursor: pointer;
				transition: all 0.3s;
			}

			> span:nth-child(1) {
				border: 1px dashed #19be6b;
				color: #19be6b;
			}
			> span:nth-child(2) {
				border: 1px dashed #2db7f5;
				color: #2db7f5;
				span {
					margin-left: 3px;
				}
			}
			> span:nth-child(3) {
				border: 1px dashed #fa795e;
				color: #fa795e;
			}
		}
	}
	.sysm {
		background-color: #fff;
		padding: 20px;
		> div {
			pre {
				margin: 8px 0;
				padding: 8px 0;
				background-color: #eee;
				border-radius: 6px;
			}
		}
	}
	.code {
		padding: 2px 4px;
		cursor: pointer;
		font-size: 90%;
		display: inline-block;
		color: #c7254e;
		// background-color: #f9f2f4;
		border-radius: 4px;
		margin: 0 5px;
	}
	.clor-box {
		i {
			display: inline-block;
			width: 10px;
			height: 10px;
		}
		span {
			margin-left: 5px;
		}
	}
</style>
<style lang="scss">
	.ivu-tooltip-inner-with-width {
		white-space: initial;
	}
</style>