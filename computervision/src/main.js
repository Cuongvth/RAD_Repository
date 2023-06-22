import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { faBloggerB } from "@fortawesome/free-brands-svg-icons";
/* add icons to the library */
library.add(faHouse, faCalendarPlus, faBloggerB);
loadFonts();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount("#app");
