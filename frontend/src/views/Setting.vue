<template>
  <div class="settings-page">
    <!-- 项目配置卡片 -->
    <el-card v-if="settingStore.globalSetting" class="settings-card network-card">
      <template #header>
        <div class="card-header">
          <el-icon><Connection /></el-icon>
          <h2>项目配置</h2>
        </div>
      </template>

      <div class="settings-section">
        <!-- 代理配置组 -->
        <div class="settings-group">
          <div class="group-header">
            <h3>代理设置</h3>
            <el-switch
              v-model="localGlobalSetting.isProxyEnabled"
              active-text="已启用"
              @change="handleProxyChange"
            />
          </div>

          <div class="form-row">
            <div class="form-item">
              <label for="proxyDomain">代理服务器IP</label>
              <el-input
                id="proxyDomain"
                v-model="localGlobalSetting.httpProxyHost"
                placeholder="127.0.0.1"
                :disabled="!localGlobalSetting.isProxyEnabled"
                @input="handleProxyHostChange"
              >
                <template #prefix>
                  <el-icon><Monitor /></el-icon>
                </template>
              </el-input>
            </div>

            <div class="form-item">
              <label for="proxyPort">代理端口</label>
              <el-input
                id="proxyPort"
                v-model="localGlobalSetting.httpProxyPort"
                placeholder="7890"
                :disabled="!localGlobalSetting.isProxyEnabled"
              >
                <template #prefix>
                  <el-icon><Position /></el-icon>
                </template>
              </el-input>
            </div>
          </div>
        </div>

        <!-- 注册码配置组 -->
        <div class="settings-group">
          <h3>注册码设置</h3>
          <div class="form-row">
            <div class="form-item">
              <label for="AdminUserCode">管理员注册码</label>
              <el-input-number
                id="AdminUserCode"
                v-model="localGlobalSetting.AdminUserCode"
                :controls="false"
                :precision="0"
                placeholder="设置管理员注册码"
              >
                <template #prefix>
                  <el-icon><Key /></el-icon>
                </template>
              </el-input-number>
            </div>

            <div class="form-item">
              <label for="CommonUserCode">普通用户注册码</label>
              <el-input-number
                id="CommonUserCode"
                v-model="localGlobalSetting.CommonUserCode"
                :controls="false"
                :precision="0"
                placeholder="设置普通用户注册码"
              >
                <template #prefix>
                  <el-icon><Key /></el-icon>
                </template>
              </el-input-number>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 用户配置卡片 -->
    <el-card class="settings-card user-card">
      <template #header>
        <div class="card-header">
          <el-icon><User /></el-icon>
          <h2>用户配置</h2>
        </div>
      </template>

      <div class="settings-section">
        <div class="settings-group">
          <h3>网盘授权</h3>
          <div class="form-row">
            <div class="form-item full-width">
              <label for="cookie115">115网盘 Cookie</label>
              <el-input
                id="cookie115"
                v-model="localUserSettings.cloud115Cookie"
                type="password"
                show-password
                placeholder="请输入115网盘Cookie"
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </div>
          </div>

          <div class="form-row">
            <div class="form-item full-width">
              <label for="cookieQuark">夸克网盘 Cookie</label>
              <el-input
                id="cookieQuark"
                v-model="localUserSettings.quarkCookie"
                type="password"
                show-password
                placeholder="请输入夸克网盘Cookie"
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </div>
          </div>
        </div>

        <!-- 帮助链接 -->
        <div class="settings-help">
          <h3>帮助文档</h3>
          <div class="help-links">
            <el-link
              href="https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l?singleDoc=true"
              target="_blank"
              type="primary"
            >
              <el-icon><QuestionFilled /></el-icon>
              CloudSaver部署与使用常见问题
            </el-link>
            <el-link
              href="https://www.yuque.com/xiaoruihenbangde/ggogn3/cl2g0p9h3xrgfa5i"
              target="_blank"
              type="primary"
            >
              <el-icon><QuestionFilled /></el-icon>
              CloudSaver功能介绍
            </el-link>
            <el-link
              href="https://alist.nn.ci/zh/guide/drivers/115.html#cookie获取方式"
              target="_blank"
              type="primary"
            >
              <el-icon><QuestionFilled /></el-icon>
              如何获取115网盘Cookie？
            </el-link>
            <el-link
              href="https://alist.nn.ci/zh/guide/drivers/quark.html#cookie"
              target="_blank"
              type="primary"
            >
              <el-icon><QuestionFilled /></el-icon>
              如何获取夸克网盘Cookie？
            </el-link>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="settings-card token-card">
      <template #header>
        <div class="token-card-header">
          <div class="card-header">
            <el-icon><Key /></el-icon>
            <h2>API Token</h2>
          </div>
          <el-button type="primary" :icon="Plus" @click="showCreateTokenDialog = true">
            生成 Token
          </el-button>
        </div>
      </template>

      <div class="settings-section">
        <el-alert
          title="Token 可供 Agent 和 CLI 长期调用 API。明文只在创建时显示一次，请妥善保存。"
          type="warning"
          :closable="false"
          show-icon
        />

        <el-table v-loading="tokensLoading" :data="apiTokens" empty-text="尚未创建 API Token">
          <el-table-column prop="name" label="名称" min-width="130" />
          <el-table-column prop="tokenPrefix" label="Token" min-width="130" />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getTokenStatus(row).type">{{ getTokenStatus(row).text }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="最近使用" min-width="150">
            <template #default="{ row }">{{ formatDate(row.lastUsedAt) || "从未使用" }}</template>
          </el-table-column>
          <el-table-column label="有效期至" min-width="150">
            <template #default="{ row }">{{ formatDate(row.expiresAt) || "永不过期" }}</template>
          </el-table-column>
          <el-table-column label="操作" width="90" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="!row.revokedAt"
                type="danger"
                link
                :icon="Delete"
                @click="handleRevokeToken(row)"
              >
                撤销
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog v-model="showCreateTokenDialog" title="生成 API Token" width="460px">
      <el-form label-position="top">
        <el-form-item label="名称" required>
          <el-input
            v-model="tokenForm.name"
            maxlength="50"
            show-word-limit
            placeholder="例如：OpenClaw 自动化"
          />
        </el-form-item>
        <el-form-item label="有效期">
          <el-select v-model="tokenForm.expiresInDays" style="width: 100%">
            <el-option label="永不过期" :value="null" />
            <el-option label="30 天" :value="30" />
            <el-option label="90 天" :value="90" />
            <el-option label="365 天" :value="365" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateTokenDialog = false">取消</el-button>
        <el-button type="primary" :loading="creatingToken" @click="handleCreateToken">
          生成
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="showGeneratedTokenDialog"
      title="API Token 已生成"
      width="560px"
      :close-on-click-modal="false"
      @closed="generatedToken = ''"
    >
      <el-alert
        title="请立即复制。关闭窗口后无法再次查看此 Token。"
        type="warning"
        :closable="false"
        show-icon
      />
      <el-input v-model="generatedToken" class="generated-token" readonly>
        <template #append>
          <el-button :icon="CopyDocument" @click="copyGeneratedToken">复制</el-button>
        </template>
      </el-input>
    </el-dialog>

    <!-- 保存按钮 -->
    <div class="settings-actions">
      <el-button type="primary" @click="handleSave"> 保存设置 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSettingStore } from "@/stores/userSetting";
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { GlobalSettingAttributes, UserSettingAttributes } from "@/types/user";
import type { ApiTokenInfo } from "@/types/user";
import { userApi } from "@/api/user";
import { copyText } from "@/utils/clipboard";
import { ElMessageBox } from "element-plus";
import {
  Connection,
  Monitor,
  Position,
  Key,
  User,
  Lock,
  QuestionFilled,
  Plus,
  Delete,
  CopyDocument,
} from "@element-plus/icons-vue";

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

// 监听 store 变化,更新本地状态
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

const handleCreateToken = async () => {
  if (!tokenForm.value.name.trim()) {
    ElMessage.warning("请输入 Token 名称");
    return;
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
    showCreateTokenDialog.value = false;
    showGeneratedTokenDialog.value = true;
    tokenForm.value = { name: "", expiresInDays: null };
    await loadApiTokens();
  } catch (error) {
    console.error("生成 API Token 失败:", error);
  } finally {
    creatingToken.value = false;
  }
};

const handleRevokeToken = async (token: ApiTokenInfo) => {
  try {
    await ElMessageBox.confirm(
      `撤销“${token.name}”后，使用它的 Agent 将立即失去访问权限。`,
      "撤销 Token",
      {
        confirmButtonText: "确认撤销",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
  } catch {
    return;
  }
  await userApi.revokeApiToken(token.tokenId);
  ElMessage.success("Token 已撤销");
  await loadApiTokens();
};

const copyGeneratedToken = async () => {
  try {
    await copyText(generatedToken.value);
    ElMessage.success("Token 已复制");
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : "复制失败，请手动复制");
  }
};

const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleString("zh-CN", { hour12: false }) : "";

const getTokenStatus = (token: ApiTokenInfo) => {
  if (token.revokedAt) return { text: "已撤销", type: "info" as const };
  if (token.expiresAt && new Date(token.expiresAt).getTime() <= Date.now()) {
    return { text: "已过期", type: "warning" as const };
  }
  return { text: "有效", type: "success" as const };
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
    ElMessage.success("设置保存成功");
  } catch (error) {
    // 保存失败时恢复开关状态
    ElMessage.error("设置保存失败");
    localGlobalSetting.value.isProxyEnabled = !val;
  }
};

// 处理代理地址,去除协议前缀
const handleProxyHostChange = (val: string) => {
  // 移除 http:// 或 https:// 前缀
  const cleanHost = val.replace(/^(https?:\/\/)/i, "");
  // 更新状态
  localGlobalSetting.value.httpProxyHost = cleanHost;
};

// 其他设置的保存
const handleSave = async () => {
  try {
    await settingStore.saveSettings({
      globalSetting: localGlobalSetting.value,
      userSettings: localUserSettings.value,
    });
    ElMessage.success("设置保存成功");
  } catch (error) {
    console.error("保存设置失败:", error);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/common.scss";

.settings-page {
  // max-width: 1000px;
  margin: 0;
  padding-bottom: 40px;
}

.settings-card {
  margin-bottom: 24px;
  border-radius: var(--theme-radius);
  transition: var(--theme-transition);
  border: 1px solid rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: var(--theme-shadow);
  }

  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
}

.token-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.generated-token {
  margin-top: 20px;
}

.card-header {
  @include flex-center;
  gap: 12px;

  .el-icon {
    font-size: 20px;
    color: var(--theme-primary);
  }

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--theme-text-primary);
  }
}

.settings-section {
  padding: 20px;
}

.settings-group {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    margin: 0 0 16px;
    font-size: 14px;
    font-weight: 600;
    color: var(--theme-text-regular);
  }

  .group-header {
    @include flex-center;
    justify-content: space-between;
    margin-bottom: 16px;

    h3 {
      margin: 0;
    }
  }
}

.form-row {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-item {
  flex: 1;
  min-width: 0;

  &.full-width {
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    color: var(--theme-text-secondary);
  }

  :deep(.el-input),
  :deep(.el-input-number) {
    width: 100%;

    .el-input__wrapper {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
      transition: var(--theme-transition);

      &:hover {
        box-shadow: 0 0 0 1px var(--theme-primary);
      }

      &.is-focus {
        box-shadow:
          0 0 0 1px var(--theme-primary),
          0 0 0 3px rgba(0, 102, 204, 0.1);
      }
    }

    .el-input__prefix-inner {
      .el-icon {
        margin-right: 8px;
        color: var(--theme-text-secondary);
      }
    }
  }
}

.settings-help {
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  .help-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-top: 16px;
  }

  :deep(.el-link) {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    .el-icon {
      font-size: 16px;
    }

    &:hover {
      transform: translateX(4px);
    }
  }
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;

  .el-button {
    min-width: 120px;
    height: 40px;
    border-radius: 20px;
    font-size: 14px;
    transition: var(--theme-transition);

    .el-icon {
      margin-right: 6px;
      font-size: 16px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--theme-shadow-sm);
    }
  }
}
</style>
