<template>
  <view>
    <TabBar :tab-bars="tabBars" :tab-index="state.tabIndex" @tabTap="tabTap" />
    <view>
      <uni-list>
        <uni-list-item
          v-for="item in state.messages"
          :key="item.id"
          direction="column"
          clickable
          @click="handleTapItem(item)"
        >
          <template v-if="!item.isRead" #header>
            <image src="../../static/images/dot.png" class="d-msg-item-dot" />
          </template>
          <template #body>
            <view class="d-msg-item-header">
              <text class="d-msg-item-title">
                {{ item.title }}
              </text>
              <text class="d-msg-item-time">
                {{ item.createTime }}
              </text>
            </view>
          </template>
          <template #footer>
            <text class="d-msg-item-content">
              {{ item.content }}
            </text>
          </template>
        </uni-list-item>
      </uni-list>
      <uni-load-more v-if="state.messages.length > 9" :status="state.loadMoreStatus" />
    </view>
    <NoMatch v-if="state.messages.length === 0" />
  </view>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {onLoad, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'
import TabBar from '@/components/tabBar'
import NoMatch from '@/components/noMatch'

const tabBars = [
  {
    id: 'normal',
    name: '普通消息',
  },
  {
    id: 'announcement',
    name: '公告',
  },
]

interface IState {
  tabIndex: number
  pagination: {
    pageSize: number
    page: number
    total: number
  }
  messages: any[]
  loadMoreStatus: 'more' | 'loading' | 'noMore'
}

const state: IState = reactive({
  loading: true,
  tabIndex: 0,
  pagination: {
    pageSize: 20,
    page: 1,
    total: 0,
  },
  messages: [], // 消息数据
  loadMoreStatus: 'more', // 加载更多状态
})

onLoad(() => {
  handleGetMessages('normal')
})

/** 下拉刷新 */
onPullDownRefresh(() => {
  state.pagination.page = 1
  state.messages = []
  if (state.tabIndex === 0) {
    handleGetMessages('normal')
  } else {
    uni.stopPullDownRefresh()
  }
})

/** 上拉加载更多 */
onReachBottom(() => {
  state.pagination.page += 1
  handleGetMessages('normal')
})

/** 获取消息数据 */
const handleGetMessages = async (type: 'normal' | 'announcement') => {
  if (type === 'normal') {
    for (let i = 0; i < 20; i++) {
      state.messages.push(
        reactive({
          id: state.pagination.page * state.pagination.pageSize + i,
          title: '安全检查通知',
          isRead: i % 2 === 0,
          content: '黄忠站信号室配电箱杂乱，存在触电风险，建议通知施工人员理好线序，保持室内干燥，避免漏电风险。',
          createTime: '2022-10-31',
          readTime: '2022-11-1 12:12:12',
        })
      )
    }
    state.pagination.total += 10
  } else {
    state.messages = []
    state.pagination.total = 0
  }
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 500)
}

/** 点击消息 */
const handleTapItem = (item: any) => {
  state.messages.find((s) => s.id === item.id).isRead = true
  uni.navigateTo({url: `/pages/message/detail?message=${JSON.stringify(item)}`})
}

/** tab切换 */
const tabTap = (index: number) => {
  state.tabIndex = index
  handleGetMessages(index === 0 ? 'normal' : 'announcement')
}
</script>

<style lang="scss" scoped>
.d-msg-item-dot {
  width: 30rpx;
  height: 30rpx;
  border-radius: 15rpx;
  position: absolute;
  left: 0;
  top: 50rpx;
}

.d-msg-item-header {
  display: flex;
  justify-content: space-around;

  .d-msg-item-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 7;
  }

  .d-msg-item-time {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 3;
    font-size: 28rpx;
    color: #999;
    text-align: right;
  }
}

.d-msg-item-content {
  font-size: 24rpx;
  color: #999;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
