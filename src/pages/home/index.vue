<template>
  <view class="d-home-container">
    <view class="d-home-header">
      <text>{{ selectedProject.name }}</text>
      <image class="d-home-switch" src="../../static/images/switch.png" @click="handleTapSwitch" />
    </view>
    <view class="d-home-body">
      <uni-section
        v-for="item in menus"
        :key="item.id"
        :title="item.title"
        title-font-size="18px"
        class="d-home-section"
      >
        <uni-grid :column="4" :show-border="false" :square="false">
          <navigator
            v-for="item1 in item.children"
            :key="item1.id"
            :url="item1.path"
            open-type="navigate"
            hover-class="navigator-hover"
          >
            <uni-grid-item>
              <view class="d-home-item1-box">
                <uni-icons type="image" :size="30" color="#777" />
                <text class="d-home-item1-title">
                  {{ item1.title }}
                </text>
              </view>
            </uni-grid-item>
          </navigator>
        </uni-grid>
      </uni-section>
    </view>
    <uni-popup ref="popup" type="bottom" @maskClick="handleClosePopup">
      <switch-project :selected-project-id="selectedProject?.id" @close="handleClosePopup" />
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useAppStore} from '@/stores/modules/app'
import SwitchProject from '@/components/switchProject'

const menus = reactive([
  {
    id: 1,
    title: '项目管理',
    children: [
      {
        id: 11,
        title: '打卡',
        icon: '',
        path: '/pages/projectManager/sign/index',
      },
      {
        id: 12,
        title: '项目进度',
        icon: '',
        path: '/pages/projectManager/progress/index',
      },
      {
        id: 13,
        title: '现场检查',
        icon: '',
        path: '/pages/projectManager/inspect/index',
      },
      {
        id: 14,
        title: '会议纪要',
        icon: '',
        path: '/pages/projectManager/summary/index',
      },
      {
        id: 15,
        title: '附件类',
        icon: '',
        path: '',
      },
    ],
  },
  {
    id: 2,
    title: '规章制度',
    children: [
      {
        id: 21,
        title: '管理制度',
        icon: '',
        path: '/pages/rule/manager/index',
      },
      {
        id: 22,
        title: '施工方案',
        icon: '',
        path: '/pages/rule/constructionPlan/index',
      },
      {
        id: 23,
        title: '风险源',
        icon: '',
        path: '/pages/rule/riskSource/index',
      },
      {
        id: 24,
        title: '隐患库',
        icon: '',
        path: '/pages/rule/hiddenDanger/index',
      },
    ],
  },
  {
    id: 3,
    title: '个人信息',
    children: [
      {
        id: 31,
        title: '基础信息',
        icon: '',
        path: '/pages/user/userInfo/index',
      },
      {
        id: 32,
        title: '工资发放',
        icon: '',
        path: '/pages/user/wage/index',
      },
      {
        id: 33,
        title: '我的工牌',
        icon: '',
        path: '',
      },
    ],
  },
])

const popup = ref<any>(null)
const {selectedProject} = storeToRefs(useAppStore())

/** 点击切换 */
const handleTapSwitch = () => {
  popup.value.open()
  uni.hideTabBar()
}

/** 关闭弹窗 */
const handleClosePopup = () => {
  uni.showTabBar()
  popup.value.close()
}
</script>

<style lang="scss" scoped>
.d-home-container {
  height: 100%;
  background-color: $uni-bg-color;
  padding: 15rpx;
}

.d-home-header {
  display: flex;
  background-color: $uni-bg-color-white;
  padding: 20rpx;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.d-home-switch {
  width: 60rpx;
  height: 40rpx;
}

.d-home-body {
  background-color: $uni-bg-color;
  display: flex;
  flex-direction: column;
}

.d-home-section {
  margin-bottom: 20rpx;
  background-color: $uni-bg-color-white;
}

.d-home-item1-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;

  .d-home-item1-title {
    font-size: 28rpx;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
