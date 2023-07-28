import mock from "./mock";
import "./apps/chat";
import "./apps/chatv2";

// forwards the matched request over network
mock.onAny().passThrough();
