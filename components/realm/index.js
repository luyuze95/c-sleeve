// components/realm/index.js
import {Fence} from "../models/fence";
import {FenceGroup} from "../models/fence-group";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  observers: {
    'spu': function (spu) {
      if (!spu) {
        return;
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      this.bindInitData(fenceGroup);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      });
    }
  }
});
