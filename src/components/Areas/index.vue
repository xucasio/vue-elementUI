<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-form-item>
          <el-select v-model="areas.province" width="100%" clearable placeholder="请选择省" @change="getCity">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.areaName"
              :value="item.areaName"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-select v-model="areas.city" width="100%" clearable placeholder="请选择市" @change="getArea">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.areaName"
              :value="item.areaName"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-select ref="areaSelect" v-model="areas.district" value-key="id" width="100%" clearable placeholder="请选择区" @change="areaChange">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.areaName"
              :value="item.areaName"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArea } from '@/api/common/index'
export default {
  name: 'Areas',
  props: {
    areas: {
      type: Object,
      default: () => {
        return {
          province: '',
          city: '',
          district: ''
        }
      }
    }
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: []
    }
  },
  created() {
    this.getProvince()
  },
  methods: {
    getProvince() { // 获取省下拉框
      getArea({ parentId: '0' }).then(res => {
        this.provinceList = res.area
      })
    },
    getCity(val) { // 获取城市下拉框
      if (val) {
        const arr = this.provinceList.filter((item) => {
          return item.areaName === val
        })
        getArea({ parentId: arr[0].id || '' }).then(res => {
          this.cityList = res.area
          this.cityList.unshift({ areaName: '请选择', id: '' })
          this.areaList.unshift({ areaName: '请选择', id: '' })
          this.areas.city = ''
          this.areas.district = ''
        })
      }
    },
    getArea(val) { // 获取区县下拉框
      if (val) {
        const arr = this.cityList.filter((item) => {
          return item.areaName === val
        })
        getArea({ parentId: arr[0].id || '' }).then(res => {
          this.areaList = res.area
          this.areaList.unshift({ areaName: '请选择', id: '' })
          this.areas.district = ''
        })
      }
    },
    areaChange(val) {
      if (val) {
        // 必须重新绑定
        this.areaList = this.areaList.concat([])
        this.areas.district = val
      }
    }
  }
}
</script>
