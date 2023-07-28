import mock from "./mock";
import "./apps/chat";

// forwards the matched request over network
mock.onAny().passThrough();
