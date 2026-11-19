import DefaultTheme from "vitepress/theme";
import HomePage from "./components/HomePage.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component("HomePage", HomePage);
  },
};
