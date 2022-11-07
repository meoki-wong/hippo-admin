<template>
    <div class="slider-contain">
        <a-menu
            theme="dark"
            mode="inline"
            :default-selected-keys="['1']"
        >
            <a-menu-item
                v-for="(item, index) in routes[0].children"
                :key="index"
                @click="goRouter(item)"
            >
                <a-icon type="user" />
                <span>{{item.name}}</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
import { routes } from "../../router/index";
export default {
  data() {
    return {
      routes,
    };
  },
  mounted(){
    console.log('---router', routes);
  },
  methods: {
    goRouter(item){
        this.$router.push(item.path)
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>