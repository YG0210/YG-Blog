# 📓 在线Jupyter环境

<style>
    /* 隐藏页面标题 */
    .md-content__title {
        display: none !important;
    }
    
    /* 移除内容区域的内外边距 */
    .md-content {
        padding: 0 !important;
        margin: 0 !important;
    }
    
    /* 加载动画容器 */
    .loading-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 999;
        transition: opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
    }
    
    /* 加载动画隐藏状态 */
    .loading-container.hidden {
        opacity: 0;
        transform: translateY(-100vh);
    }
    
    /* 加载动画旋转球 */
    .loading-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 20px;
    }
    
    /* 加载动画文本 */
    .loading-text {
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 18px;
        font-weight: 500;
        opacity: 0;
        animation: fadeIn 0.5s ease-in-out 0.3s forwards;
    }
    
    /* 动画关键帧 */
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    /* Jupyter容器样式 - 全屏版 */
    .jupyter-container {
        width: 100%;
        max-width: none;
        height: calc(100vh - 60px); /* 保持垂直高度不变 */
        overflow: hidden;
        margin: 0 !important;
        padding: 0 !important;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        z-index: 1;
    }
    
    /* iframe样式 */
    .jupyter-iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>

<!-- 加载动画 -->
<div class="loading-container" id="loadingContainer">
    <div class="loading-spinner"></div>
    <div class="loading-text">正在加载Jupyter环境...</div>
</div>

<!-- Jupyter容器 -->
<div class="jupyter-container" id="jupyterContainer">
    <iframe 
        class="jupyter-iframe"
        src="https://jupyterlite.github.io/demo/lab/index.html"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
</div>

<script>
    // 页面加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        const loadingContainer = document.getElementById('loadingContainer');
        
        // 模拟加载过程
        setTimeout(function() {
            // 隐藏加载动画
            loadingContainer.classList.add('hidden');
        }, 1500);
    });
</script>
