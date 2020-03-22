<template>
	<div>
		<Modal v-model="oneBugIsShow" width="70%" @on-cancel="handleShow(false)">
			<div slot="header">
				<h3>
					<Icon type="ios-create-outline" size="22"/>自动化部署
				</h3>
			</div>
			<div class="warp">
				<!-- 所属项目 -->
				<div v-if="isAddClear">
					<label>所属项目：</label>
					<Select v-model="projectName" style="width:300px">
						<Option v-for="(item,i) in sideList" :value="item" :key="i+'w'">{{ item }}</Option>
					</Select>
					<Icon type="ios-add-circle-outline" class="add-clear" size="26" @click="handleAddClear"/>
				</div>
				<div v-else>
					<label>所属项目：</label>
					<Input v-model="projectName" placeholder="请输入新项目名称..." style="width: 300px"/>
					<Icon type="ios-close-circle-outline" class="add-clear" size="26" @click="handleAddClear"/>
				</div>
				<div v-if="!isAddClear">
					<label>部署目录：</label>
					<Input v-model="root" placeholder="默认：dist" style="width: 300px"/>
				</div>
				<div>
					<label>Git 地址：</label>
					<Input v-model="root1" placeholder="例如：https://github.com/zlluGitHub/vue-cil3.0-template.git" style="width: 400px"/>
				</div>
				<div>
					<label>部署命令：</label>
					<Input v-model="order" placeholder="例如：cnpm run build 或 npm run build" style="width: 300px"/>
				</div>
				<div>
					<label>打包目录：</label>
					<Input v-model="root1" placeholder="默认：dist" style="width: 300px"/>
				</div>
				<!--<div>
					<label>部署文件：</label>
					 <uploader
						:key="uploader_key"
						:options="options"
						ref="uploader"
						class="uploader-example"
						@file-success="onFileSuccess"
						@upload-start="onFileStart"
						@file-removed="onFileRemoved"
						@file-added="onFileAdded"
						@files-submitted="onFileSubmitted"
						@file-complete="fileComplete"
						@complete="complete"
						:autoStart="true"
						:fileStatusText="fileStatusText"
					>
						<uploader-unsupport></uploader-unsupport>
						<uploader-drop class="uploader-drop-botton" v-if="isUpLoader">
							<uploader-btn :directory="true" :single="true">
								<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							</uploader-btn>
						</uploader-drop>
						<uploader-list></uploader-list>
					</uploader> 
				</div>-->
				<div class="banben">
					<div>
						<label>立即部署：</label>
						<RadioGroup v-model="idDeployment">
							<Radio label="yes">是</Radio>
							<Radio label="no">否</Radio>
						</RadioGroup>
					</div>
					<div>
						<label>部署版本：</label>
						<span>{{version}}</span>
					</div>
				</div>

				<div>
					<label>部署摘要：</label>
					<Input v-model="remark" type="textarea" :rows="4" placeholder="请输入概要内容...'"/>
				</div>
			</div>
			<div slot="footer">
				<div class="button-footer">
					<Button type="success" @click="handleSubmit">提交部署</Button>
					<Button type="primary" @click.stop="handleShow(false)">关闭</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>
<script>
	// import QuillEditor from "../../../public/QuillEditor";
	export default {
		// components: {
		// 	QuillEditor
		// },
		// computed: {
		// 	oneBugIsShow() {
		// 		return this.$store.state.show.oneBugIsShow;
		// 	}
		// },
		props: ["typeArr", "classArr"],

		data() {
			return {
				oneBugIsShow: true,
				isUpLoader: true,
				uploader_key: new Date().getTime(), //这个用来刷新组件--解决不刷新页面连续上传的缓存上传数据（注：每次上传时，强制这个值进行更改---根据自己的实际情况重新赋值）
				options: {
					target: this.$url + "/api/deploy/files/add", //SpringBoot后台接收文件夹数据的接口
					testChunks: false, //是否分片-不分片
					query: {
						version: "1.0.1",
						root: "dist"
					},
					fileParameterName: "file" //上传文件时文件的参数名，默认file
				},
				root: "dist",
				version: "1.0.1",
				fileStatusText: {
					error: "上传失败",
					paused: "等待上传",
					success: "上传成功",
					uploading: "正在上传...",
					waiting: "等待中..."
				},
				projectName: "",
				idDeployment: "yes",
				remark: "",
				catalog: "", //上传目录
				isAddClear: true,
				uid: "",
				sideList: [],
				itemData: {}
				// ----------------------------------------------------
			};
		},
		watch: {
			root(val) {
				this.options.query.root = val;
			},
			projectName(val) {
				if (val != this.itemData.projectName) {
					this.version = "1.0.1";
					this.options.query.version = this.version;
					this.uid = "";
					this.root = "";
					console.log('zdscsfds');
					
				} else {
					this.isAddClear = true;
					this.getBidData(this.itemData);
				}
			}
		},
		mounted() {
			let author = this.$store.state.user.info;
			this.author = author.name;
			this.url = author.url;
			this.sideList = this.$store.state.variable.sideList;
			let _this = this;
			this.$event.on("isOpenAdd", e => {
				_this.itemData = e;
				_this.getBidData(e);
				_this.handleShow(true);
			});
		},
		methods: {
			// 上传完成
			complete() {
				// console.log("complete", arguments);
				this.isUpLoader = false;
			},
			// 一个根文件（文件夹）成功上传完成。
			fileComplete(catalog, file) {
				this.catalog = catalog.name;
				this.isUpLoader = false;
			},
			//注，这里从文件夹每上传成功一个文件会调用一次这个方法
			onFileSuccess: function(rootFile, file, response, chunk) {
				// console.log("上传成功");
				//这里可以根据response（接口）返回的数据处理自己的实际问题（如：从response拿到后台返回的想要的数据进行组装并显示）
			},
			//开始上传。
			onFileStart: function(file) {
				// console.log("开始上传");
				// console.log(file);
			},
			//移除一个文件（文件夹）。
			onFileRemoved: function(file) {
				// console.log("移除一个文件");
				// console.log(file);
			},
			//添加了一个文件，一般用作文件校验，如果给 file 增加 ignored 属性为 true 的话就会被过滤掉。
			onFileAdded: function(file) {
				// console.log("添加了一个文件");
				// console.log(file);
			},
			//所选择的文件们添加到上传队列后触发。
			onFileSubmitted: function(files, fileList) {
				// console.log(files, fileList);
			},
			getBidData(e) {
				let _this = this;
				if (e) {
					let arr = e.version.split(".");
					if (arr[2].indexOf("9") > -1) {
						arr[2] = 0;
						if (arr[1].indexOf("9") > -1) {
							arr[1] = 0;
							arr[0] = arr[0] * 1 + 1;
						} else {
							arr[1] = arr[1] * 1 + 1;
						}
					} else {
						arr[2] = arr[2] * 1 + 1;
					}
					_this.version = arr[0] + "." + arr[1] + "." + arr[2];
					_this.root = e.root;
					_this.projectName = e.projectName;
					_this.uid = e.bid;
					_this.catalog = e.catalog;
				} else {
					_this.version = "1.0.1";
					_this.root = "";
				}
				_this.options.query.version = _this.version;
				_this.options.query.root = _this.root;
			},

			handleSubmit() {
				this.$Message.destroy();
				// 判断输入内容是否为空
				if (!this.projectName) {
					this.$Message["error"]({
						background: true,
						content: "请选择所属项目！"
					});
					return;
				}
				if (!this.root) {
					this.$Message["error"]({
						background: true,
						content: "部署目录不得为空！"
					});
					return;
				}

				let data = {
					projectName: this.projectName,
					author: this.author,
					url: this.url ? this.url : "/assets/img/dt.png",
					idDeployment: this.idDeployment,
					root: this.root,
					version: this.version,
					uid: this.uid,
					catalog: this.catalog,
					versionRoot: "./" + this.root + "/" + this.version,
					remark: this.remark
				};
				this.$axios
					.post("/api/deploy/edition/add", this.$qs.stringify(data))
					.then(res => {
						if (res.data.result) {
							this.$Message["success"]({
								background: true,
								content: "数据提交成功！"
							});
							this.$event.emit("on-success", res.data);
							this.handleShow(false);
						} else {
							this.$Message["error"]({
								background: true,
								content: "数据上传失败！"
							});
						}
						// this.$router.push({ path: "/Artlist" });
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			handleAddClear() {
				this.isAddClear = !this.isAddClear;
			},
			handleShow(e) {
				this.oneBugIsShow = e;
			}
			// -------------------------------------------------------
			// handleClear() {
			// 	this.bid = "";
			// 	this.title = "";
			// 	this.type = "";
			// 	this.url = "";
			// 	this.brief = "";
			// 	this.imgSrc = "";
			// 	this.classVal = "";
			// 	this.explain = "";
			// 	this.bid = "";
			// 	this.date = "";
			// 	this.chartClass = "0";
			// },

			// handleAddClear() {
			// 	this.isAddClear = !this.isAddClear;
			// },

			// onEditorChange(quill) {
			// 	// console.log(quill);
			// 	this.explain = quill.html;
			// },
			// handleSuccess(res, file) {
			// 	if (res.result) {
			// 		this.imgSrc = res.fileInfo.path;
			// 		this.$Message["success"]({
			// 			background: true,
			// 			content: "图片上传成功！"
			// 		});
			// 	} else {
			// 		this.$Message["error"]({
			// 			background: true,
			// 			content: "图片上传失败！"
			// 		});
			// 	}
			// }
		}
	};
</script>
<style lang="scss" scoped>
	.uploader-example {
		width: 300px;
		font-size: 12px;
		// margin: 0 30px;
		.uploader-drop-botton {
			margin-top: 10px;
			display: flex;
			justify-content: center;
		}
	}
	.uploader-example .uploader-list {
		max-height: 440px;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.warp {
		padding-bottom: 20px;
		img {
			display: block;
			width: 218px;
			height: 155px;
		}
		.upload {
			padding: 30px 50px;
		}
		.banben {
			padding: 20px 40px;
			> div {
				width: 28%;
				> div {
					width: 150px;
				}
			}
		}
		p,
		> div {
			padding: 10px 10px;
			display: flex;
			align-items: center;
			> label {
				margin-right: 6px;
				width: 100px;
				text-align: right;
			}
			> div {
				> label {
					margin-right: 6px;
				}
			}
			.editor {
				width: 86%;
			}
		}
		.add-clear {
			cursor: pointer;
		}
		.add-clear:hover {
			color: #19be6b;
		}
	}
	.button-footer {
		margin-bottom: 20px;
	}
</style>

<style lang="scss">
	.warp {
		.uploader-drop {
			background: transparent;
			padding: 0;
		}
		.uploader-btn {
			width: 100%;
			border: 0;
		}
		.add-clear {
			margin-left: 20px;
		}
		.uploader-btn {
			text-align: center !important;
		}
		.ivu-input-wrapper {
			width: calc(97% - 100px);
		}
		.ivu-radio-default {
			width: 40%;
		}
	}
</style>
