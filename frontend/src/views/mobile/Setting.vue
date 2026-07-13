<template>
  <div class="setting">
    <!-- 全局设置 -->
    <div v-if="settingStore.globalSetting" class="setting__section">
      <div class="setting__title">项目配置</div>
      <div class="setting__card">
        <van-cell-group inset>
          <van-field
            v-model="localGlobalSetting.httpProxyHost"
            label="代理服务器IP"
            placeholder="127.0.0.1"
            @update:model-value="handleProxyHostChange"
          />
          <van-field
            v-model="localGlobalSetting.httpProxyPort"
            label="代理端口"
            placeholder="7890"
          />
          <van-field
            v-model.number="localGlobalSetting.AdminUserCode"
            label="管理员码"
            type="digit"
            placeholder="设置管理员注册码"
          />
          <van-field
            v-model.number="localGlobalSetting.CommonUserCode"
            label="用户注册码"
            type="digit"
            placeholder="设置普通用户注册码"
          />
          <van-cell center title="启用代理">
            <template #right-icon>
              <van-switch
                v-model="localGlobalSetting.isProxyEnabled"
                size="24px"
                @change="handleProxyChange"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <!-- 用户设置 -->
    <div class="setting__section">
      <div class="setting__title">用户配置</div>
      <div class="setting__card">
        <van-cell-group inset>
          <van-field
            v-model="localUserSettings.cloud115Cookie"
            :type="showCloud115Cookie ? 'text' : 'password'"
            label="115网盘"
            rows="2"
            autosize
            placeholder="请输入115网盘Cookie"
          >
            <template #right-icon>
              <van-icon
                :name="showCloud115Cookie ? 'eye-o' : 'closed-eye'"
                @click="showCloud115Cookie = !showCloud115Cookie"
              />
            </template>
          </van-field>

          <van-field
            v-model="localUserSettings.quarkCookie"
            :type="showQuarkCookie ? 'text' : 'password'"
            label="夸克网盘"
            rows="2"
            autosize
            placeholder="请输入夸克网盘Cookie"
          >
            <template #right-icon>
              <van-icon
                :name="showQuarkCookie ? 'eye-o' : 'closed-eye'"
                @click="showQuarkCookie = !showQuarkCookie"
              />
            </template>
          </van-field>
        </van-cell-group>
      </div>

      <!-- 帮助说明 -->
      <div class="setting__help">
        <div class="help__title">帮助说明</div>
        <div class="help__links">
          <van-cell
            title="CloudSaver部署与使用常见问题"
            is-link
            url="https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l?singleDoc=true"
          />
          <van-cell
            title="CloudSaver功能介绍"
            is-link
            url="https://www.yuque.com/xiaoruihenbangde/ggogn3/cl2g0p9h3xrgfa5i"
          />
          <van-cell
            title="如何获取115网盘cookie？"
            is-link
            url="https://alist.nn.ci/zh/guide/drivers/115.html"
          />
          <van-cell
            title="如何获取夸克网盘cookie？"
            is-link
            url="https://alist.nn.ci/zh/guide/drivers/quark.html"
          />
        </div>
      </div>
    </div>

    <div class="setting__section">
      <div class="setting__title token-title">
        <span>API Token</span>
        <van-button size="small" type="primary" @click="showCreateTokenDialog = true">
          生成 Token
        </van-button>
      </div>
      <div class="setting__card">
        <van-cell-group inset>
          <van-cell title="用于 Agent 和 CLI 长期调用" label="明文仅在创建时显示一次" />
          <van-cell
            v-for="token in apiTokens"
            :key="token.tokenId"
            :title="token.name"
            :label="`${token.tokenPrefix} · ${getTokenStatus(token)}`"
          >
            <template #value>
              <van-button
                v-if="!token.revokedAt"
                size="mini"
                type="danger"
                plain
                @click="handleRevokeToken(token)"
              >
                撤销
              </van-button>
            </template>
          </van-cell>
          <van-empty v-if="!tokensLoading && apiTokens.length === 0" description="尚未创建 Token" />
          <van-loading v-if="tokensLoading" class="token-loading" vertical>加载中</van-loading>
        </van-cell-group>
      </div>
    </div>

    <van-dialog
      v-model:show="showCreateTokenDialog"
      title="生成 API Token"
      show-cancel-button
      :before-close="beforeCreateTokenDialogClose"
    >
      <div class="token-dialog-content">
        <van-field v-model="tokenForm.name" label="名称" placeholder="例如：OpenClaw 自动化" />
        <van-field name="expiresInDays" label="有效期">
          <template #input>
            <van-radio-group v-model="tokenForm.expiresInDays" direction="horizontal">
              <van-radio :name="null">永久</van-radio>
              <van-radio :name="90">90天</van-radio>
              <van-radio :name="365">365天</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
    </van-dialog>

    <van-dialog
      v-model:show="showGeneratedTokenDialog"
      title="请立即复制 Token"
      :close-on-click-overlay="false"
      @closed="generatedToken = ''"
    >
      <div class="token-dialog-content">
        <p class="token-warning">关闭窗口后无法再次查看此 Token。</p>
        <van-field v-model="generatedToken" type="textarea" rows="3" readonly autosize />
        <van-button block type="primary" class="copy-token-button" @click="copyGeneratedToken">
          复制 Token
        </van-button>
      </div>
    </van-dialog>

    <!-- 保存按钮 -->
    <div class="setting__submit">
      <van-button round block type="primary" @click="handleSave"> 保存设置 </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSettingStore } from "@/stores/userSetting";
import { ref, watch } from "vue";
import { showConfirmDialog, showNotify } from "vant";
import type { ApiTokenInfo, GlobalSettingAttributes, UserSettingAttributes } from "@/types/user";
import { userApi } from "@/api/user";
import { copyText } from "@/utils/clipboard";

const settingStore = useUserSettingStore();

// 本地状态
const localGlobalSetting = ref<GlobalSettingAttributes>({
  httpProxyHost: "127.0.0.1",
  httpProxyPort: "7890",
  isProxyEnabled: false,
  AdminUserCode: 230713,
  CommonUserCode: 9527,
});

const localUserSettings = ref<UserSettingAttributes>({
  cloud115Cookie: "",
  quarkCookie: "",
});

// 添加显示/隐藏密码的状态
const showCloud115Cookie = ref(false);
const showQuarkCookie = ref(false);
const apiTokens = ref<ApiTokenInfo[]>([]);
const tokensLoading = ref(false);
const creatingToken = ref(false);
const showCreateTokenDialog = ref(false);
const showGeneratedTokenDialog = ref(false);
const generatedToken = ref("");
const tokenForm = ref<{ name: string; expiresInDays: number | null }>({
  name: "",
  expiresInDays: null,
});

// 监听 store 变化
watch(
  () => settingStore.globalSetting,
  (newVal) => {
    if (newVal) {
      localGlobalSetting.value = { ...newVal };
    }
  },
  { immediate: true }
);

watch(
  () => settingStore.userSettings,
  (newVal) => {
    if (newVal) {
      localUserSettings.value = { ...newVal };
    }
  },
  { immediate: true }
);

// 初始化获取设置
settingStore.getSettings();

const loadApiTokens = async () => {
  tokensLoading.value = true;
  try {
    const response = await userApi.listApiTokens();
    apiTokens.value = response.data || [];
  } catch (error) {
    console.error("加载 API Token 失败:", error);
  } finally {
    tokensLoading.value = false;
  }
};

const createApiToken = async (): Promise<boolean> => {
  if (!tokenForm.value.name.trim()) {
    showNotify({ type: "warning", message: "请输入 Token 名称" });
    return false;
  }
  creatingToken.value = true;
  try {
    const response = await userApi.createApiToken({
      name: tokenForm.value.name.trim(),
      expiresInDays: tokenForm.value.expiresInDays,
    });
    if (response.code !== 0 || !response.data) {
      throw new Error(response.message || "生成 API Token 失败");
    }
    generatedToken.value = response.data.token;
    showGeneratedTokenDialog.value = true;
    tokenForm.value = { name: "", expiresInDays: null };
    await loadApiTokens();
    return true;
  } catch (error) {
    console.error("生成 API Token 失败:", error);
    return false;
  } finally {
    creatingToken.value = false;
  }
};

const beforeCreateTokenDialogClose = async (action: string) => {
  if (action !== "confirm") return true;
  return await createApiToken();
};

const handleRevokeToken = async (token: ApiTokenInfo) => {
  try {
    await showConfirmDialog({
      title: "撤销 Token",
      message: `撤销“${token.name}”后，使用它的 Agent 将立即失去访问权限。`,
      confirmButtonText: "确认撤销",
    });
  } catch {
    return;
  }
  await userApi.revokeApiToken(token.tokenId);
  showNotify({ type: "success", message: "Token 已撤销" });
  await loadApiTokens();
};

const copyGeneratedToken = async () => {
  try {
    await copyText(generatedToken.value);
    showNotify({ type: "success", message: "Token 已复制" });
  } catch (error) {
    showNotify({
      type: "danger",
      message: error instanceof Error ? error.message : "复制失败，请手动复制",
    });
  }
};

const getTokenStatus = (token: ApiTokenInfo) => {
  if (token.revokedAt) return "已撤销";
  if (token.expiresAt && new Date(token.expiresAt).getTime() <= Date.now()) return "已过期";
  return token.lastUsedAt
    ? `最近使用 ${new Date(token.lastUsedAt).toLocaleDateString()}`
    : "未使用";
};

loadApiTokens();

// 处理代理开关变化并立即保存
const handleProxyChange = async (val: boolean) => {
  try {
    localGlobalSetting.value.isProxyEnabled = val;
    await settingStore.saveSettings({
      globalSetting: localGlobalSetting.value,
      userSettings: localUserSettings.value,
    });
    showNotify({ type: "success", message: "代理设置已更新" });
  } catch (error) {
    showNotify({ type: "danger", message: "代理设置更新失败" });
    // 保存失败时恢复开关状态
    localGlobalSetting.value.isProxyEnabled = !val;
  }
};

// 其他设置的保存
const handleSave = async () => {
  try {
    await settingStore.saveSettings({
      globalSetting: localGlobalSetting.value,
      userSettings: localUserSettings.value,
    });
    showNotify({ type: "success", message: "设置保存成功" });
  } catch (error) {
    showNotify({ type: "danger", message: "设置保存失败" });
  }
};

// 处理代理地址,去除协议前缀
const handleProxyHostChange = (val: string) => {
  // 移除 http:// 或 https:// 前缀
  const cleanHost = val.replace(/^(https?:\/\/)/i, "");
  // 更新状态
  localGlobalSetting.value.httpProxyHost = cleanHost;
};
</script>

<style lang="scss" scoped>
.setting {
  min-height: 100vh;
  background: var(--theme-background);
  padding: var(--spacing-base);
  padding-bottom: 90px; // 为底部导航栏和按钮留出空间

  &__section {
    margin-bottom: var(--spacing-lg);
  }

  &__title {
    font-size: 16px; // 统一字体大小
    font-weight: 500;
    margin-bottom: var(--spacing-base);
    color: var(--theme-color);
  }

  &__card {
    background: var(--theme-other_background);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
  }

  &__help {
    margin-top: var(--spacing-base);

    .help__title {
      font-size: 14px; // 统一字体大小
      margin-bottom: var(--spacing-sm);
      color: var(--theme-color);
    }
  }

  &__submit {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px; // tabbar 高度
    padding: var(--spacing-base);
    background: var(--theme-other_background);
    z-index: 99;
  }
}

.token-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.token-loading {
  padding: 24px 0;
}

.token-dialog-content {
  padding: 16px;
}

.token-warning {
  margin: 0 0 12px;
  color: var(--van-warning-color);
  font-size: 13px;
}

.copy-token-button {
  margin-top: 12px;
}

// 深度修改 Vant 组件样式
:deep(.van-field) {
  font-size: 14px; // 统一字体大小
}

:deep(.van-field__label) {
  width: 6em;
  color: var(--theme-color);
}

:deep(.van-cell) {
  font-size: 14px; // 统一字体大小
  padding: 12px var(--spacing-base);
}

:deep(.van-button) {
  height: 40px; // 统一按钮高度
  font-size: 14px; // 统一字体大小
}

:deep(.van-cell-group--inset) {
  margin: 0;
}

// 添加图标样式
:deep(.van-field__right-icon) {
  padding: 0 8px;
  cursor: pointer;
  color: var(--theme-color);

  .van-icon {
    font-size: 18px;
  }
}
</style>
