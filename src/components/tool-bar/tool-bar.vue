<template>
  <div class="yl-tool-bar" :style="styleComputed" :class="classComputed">
    <div class="filter-area">
      <div class="filter-content">
        <el-row>
          <slot name="filter" />
          <slot v-if="slots.more && display == '隐藏'" name="more" />
        </el-row>
      </div>
      <div v-if="slots.tool || slots.more" class="tool-func">
          <div v-if="slots.tool" class="tool-slot" :style="{ maxWidth: toolMaxWidth }">
            <slot name="tool" />
          </div>
          <div v-if="slots.more" @click="_display" class="display-btn"> 
            <!-- <el-icon :size="16" class="el-icon--right" >
              <component :is="display === '展开' ?  ArrowUp : ArrowDown" />
            </el-icon> -->
          </div>
      </div>
    </div>
    <div v-if="divider" class="divider" />
    <div v-if="slots.default" class="tool">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ToolBar'
}
</script>
<script lang="ts" setup>
import { ref, useSlots, computed } from 'vue' 
import { ElRow, ElIcon } from 'element-plus'
export interface Props {
  divider?: boolean
  paddingSize?: string, // 内边距大小
  clearPadding?: string[], // 清除内边距
  toolMaxWidth?: string, // 过滤器工具栏最大宽度
  border?: boolean // 显示边框
}
interface FlexStyle {
  padding?: string,
  paddingLeft?: string
}

const slots = useSlots()
const paddingDic:string[] = ['small', 'base', 'large'] // padding的枚举项

const { divider, paddingSize, clearPadding, border }= withDefaults(defineProps<Props>(), {
  /**
   * 分割线
   */
  divider: true,
  /**
   * 内边距尺寸
   */
  paddingSize: '',
  /**
   * 清除内边距
   */
  clearPadding: () => [],
  toolMaxWidth: '150px',
  border: false
})
const display = ref('展开')

const _display = () => {
  if (display.value === '展开') {
    display.value = '隐藏'
  } else {
    display.value = '展开'
  }
}
const styleComputed = () => {
  const styleObj:FlexStyle = {}
  if(paddingSize && paddingDic.indexOf(paddingSize) < 0) {
    styleObj.padding = paddingSize
    if(clearPadding?.length){
      clearPadding.map(it => {
        styleObj['padding-' + it] = '0px'
      })
    }
  }
  return styleObj
}
const classComputed = computed(() => {
  const classArr:string[] = []
  if(paddingSize && paddingDic.indexOf(paddingSize) >= 0) {
    classArr.push('padding-' + paddingSize)
    if(clearPadding?.length){
      classArr.push(...clearPadding.map(it => 'padding-clear-' + it))
    }
  }
  if (border) {
    classArr.push('yl-tool-bar_border')
  }
  return classArr
})
</script>