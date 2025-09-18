// 音乐播放器功能实现

// 等待DOM加载完成
function initMusicPlayer() {
    console.log('音乐播放器初始化开始');
    let musicFiles = [];
    let currentTrackIndex = 0;
    let audioElement = null;
    let isPlaying = false;
    
    // 动态读取music目录下的MP3文件
    async function loadMusicFiles() {
        console.log('开始加载音乐文件');
        try {
            // 获取当前页面的路径，用于确定相对路径
            const currentPath = window.location.pathname;
            console.log('当前页面路径:', currentPath);
            
            // 在Windows环境中处理音乐文件路径
            // 获取当前脚本的位置，用于计算相对路径
            let basePath = '';
            
            // 尝试不同的路径处理方式，确保在各种环境中能正确加载中文文件名
            try {
                // 获取当前页面的主机名，用于判断环境
                const hostname = window.location.hostname;
                
                if (hostname === '127.0.0.1' || hostname === 'localhost') {
                    // 本地开发环境 - 使用根路径
                    basePath = '/music/';
                    console.log('本地开发环境，使用根路径:', basePath);
                } else if (hostname.includes('github.io')) {
                    // GitHub Pages部署环境
                    // 提取仓库名作为基础路径
                    // GitHub Pages的URL格式通常是：username.github.io/repository-name/
                    const pathParts = currentPath.split('/').filter(Boolean);
                    
                    if (pathParts.length > 0 && !pathParts[0].includes('.')) {
                        // 假设第一个路径段是仓库名
                        const repoName = pathParts[0];
                        basePath = `/${repoName}/music/`;
                    } else {
                        // 无法确定仓库名，使用当前检测到的固定路径
                        basePath = '/YG-Blog/music/';
                    }
                    console.log('GitHub Pages环境，使用仓库路径:', basePath);
                } else {
                    // 其他情况 - 使用相对路径
                    // 从URL中移除文件名部分，只保留目录部分
                    const pathSegments = currentPath.split('/').filter(Boolean);
                    if (pathSegments.length > 0) {
                        basePath = '../'.repeat(pathSegments.length) + 'music/';
                    } else {
                        basePath = './music/';
                    }
                    console.log('其他环境，使用相对路径:', basePath);
                }
            } catch (e) {
                console.error('路径计算错误:', e);
                basePath = './music/'; // 降级到基本相对路径
            }
            
            console.log('计算得到的音乐文件基础路径:', basePath);
            
            // 优先使用从服务端注入的音乐文件列表
            // 如果不存在，则回退到预定义的列表
            let musicFileList = [];
            
            if (window.musicFileList && Array.isArray(window.musicFileList) && window.musicFileList.length > 0) {
                // 使用服务端注入的文件列表
                musicFileList = window.musicFileList;
                console.log(`使用服务端注入的音乐文件列表，共${musicFileList.length}首歌曲`);
            } else {
                // 回退到预定义的列表
                const predefinedMusic = [
                    "七里香_周杰伦_128K.mp3",
                    "晴天_周杰伦_128K.mp3",
                    "花海_周杰伦_128K.mp3",
                    "菊花台_周杰伦_128K.mp3",
                    "蒲公英的约定_周杰伦_128K.mp3",
                    "稻香_周杰伦_128K.mp3",
                    "青花瓷_周杰伦_128K.mp3"
                ];
                musicFileList = predefinedMusic;
                console.log(`使用预定义的音乐文件列表，共${musicFileList.length}首歌曲`);
            }
            
            // 处理音乐文件列表，提取歌名
            musicFiles = musicFileList.map(filename => {
                // 尝试提取干净的歌名（去掉_周杰伦_128K等后缀）
                let cleanName = filename;
                
                // 移除常见的后缀格式
                const suffixRegexes = [
                    /_周杰伦_\d+K\.mp3$/, // _周杰伦_128K.mp3
                    /_周杰伦_\d+K\(\d+\)\.mp3$/, // _周杰伦_128K(1).mp3
                    /_\w+,周杰伦_\d+K\.mp3$/, // _蔡依林,周杰伦_128K.mp3
                    /\(专辑版\)_周杰伦_\d+K\.mp3$/, // (专辑版)_周杰伦_128K.mp3
                    /\.mp3$/, // .mp3
                    /^\d+\./ // 开头的数字序号
                ];
                
                suffixRegexes.forEach(regex => {
                    cleanName = cleanName.replace(regex, '').trim();
                });
                
                // 确保路径格式正确，特别是在Windows环境下处理中文文件名
                let src = '';
                
                // 构建完整路径，确保在不同环境下都能正确访问
                // 如果是绝对路径，直接使用
                if (basePath.startsWith('/')) {
                    src = basePath + filename;
                } else {
                    // 相对路径，确保正确拼接
                    src = basePath + filename;
                }
                
                // 在浏览器环境中统一使用斜杠
                src = src.replace(/\\/g, '/');
                
                // 对中文文件名进行编码处理，确保在所有环境中都能正确加载
                try {
                    const pathParts = src.split('/');
                    const encodedFilename = encodeURIComponent(pathParts[pathParts.length - 1]);
                    pathParts[pathParts.length - 1] = encodedFilename;
                    src = pathParts.join('/');
                    console.log('编码后的完整路径:', src);
                } catch (e) {
                    console.error('文件名编码错误:', e);
                    // 即使编码失败，仍然尝试使用原始路径
                }
                
                console.log(`加载音乐文件: ${cleanName}, 编码后路径: ${src}`);
                
                return {
                    name: cleanName,
                    src: src
                };
            });
            
            // 如果有音乐文件，更新UI显示
            if (musicFiles.length > 0 && document.getElementById('track-name')) {
                document.getElementById('track-name').textContent = musicFiles[currentTrackIndex].name;
            }
        } catch (error) {
            console.error('加载音乐文件失败:', error);
            musicFiles = [{ name: '暂无音乐', src: '' }];
        }
    }
    
    // 创建音乐播放器容器
    function createMusicPlayer() {
        const playerContainer = document.createElement('div');
        playerContainer.id = 'music-player';
        playerContainer.className = 'music-player';
        
        // 创建上一首按钮（左侧）
        const prevButton = document.createElement('button');
        prevButton.id = 'prev-button';
        prevButton.className = 'music-button';
        prevButton.innerHTML = '<i class="fas fa-step-backward"></i>';
        playerContainer.appendChild(prevButton);
        
        // 创建播放/暂停按钮（中间）
        const playButton = document.createElement('button');
        playButton.id = 'play-button';
        playButton.className = 'music-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playerContainer.appendChild(playButton);
        
        // 创建下一首按钮（右侧）
        const nextButton = document.createElement('button');
        nextButton.id = 'next-button';
        nextButton.className = 'music-button';
        nextButton.innerHTML = '<i class="fas fa-step-forward"></i>';
        playerContainer.appendChild(nextButton);
        
        // 创建音乐名称显示
        const trackName = document.createElement('div');
        trackName.id = 'track-name';
        trackName.className = 'track-name';
        trackName.textContent = musicFiles.length > 0 ? musicFiles[currentTrackIndex].name : '暂无音乐';
        playerContainer.appendChild(trackName);
        
        // 创建audio元素
        audioElement = document.createElement('audio');
        audioElement.id = 'audio-player';
        audioElement.src = musicFiles.length > 0 ? musicFiles[currentTrackIndex].src : '';
        audioElement.preload = 'metadata';
        document.body.appendChild(audioElement);
        
        // 添加事件监听器
        audioElement.addEventListener('ended', playNextTrack);
        
        playButton.addEventListener('click', togglePlayPause);
        prevButton.addEventListener('click', playPrevTrack);
        nextButton.addEventListener('click', playNextTrack);
        
        return playerContainer;
    }
    
    // 切换播放/暂停状态
    function togglePlayPause() {
        const playButton = document.getElementById('play-button');
        
        if (isPlaying) {
            audioElement.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioElement.play().catch(error => {
                console.error('播放失败:', error);
            });
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        isPlaying = !isPlaying;
    }
    
    // 播放上一首（随机）
    function playPrevTrack() {
        // 实现随机切换
        const oldIndex = currentTrackIndex;
        do {
            currentTrackIndex = Math.floor(Math.random() * musicFiles.length);
        } while (musicFiles.length > 1 && currentTrackIndex === oldIndex);
        changeTrack();
    }
    
    // 播放下一首（随机）
    function playNextTrack() {
        // 实现随机切换
        const oldIndex = currentTrackIndex;
        do {
            currentTrackIndex = Math.floor(Math.random() * musicFiles.length);
        } while (musicFiles.length > 1 && currentTrackIndex === oldIndex);
        changeTrack();
    }
    
    // 切换当前播放的曲目
    function changeTrack() {
        audioElement.src = musicFiles[currentTrackIndex].src;
        
        // 更新曲目名称
        const trackName = document.getElementById('track-name');
        trackName.textContent = musicFiles[currentTrackIndex].name;
        
        // 根据歌名长度决定显示样式
        updateTrackNameStyle(trackName);
        
        // 如果当前正在播放，则切换到新曲目后继续播放
        if (isPlaying) {
            audioElement.play().catch(error => {
                console.error('播放失败:', error);
            });
        }
    }
    
    // 根据歌名长度更新显示样式
    function updateTrackNameStyle(trackNameElement) {
        let songName = trackNameElement.textContent;
        
        // 移除之前可能添加的滚动类
        trackNameElement.classList.remove('scroll');
        
        // 判断中文字符数量（一个中文字符算一个字符）
        const charCount = songName.length;
        
        // 如果歌名超过6个字符，只显示前6个字符
        if (charCount > 6) {
            songName = songName.substring(0, 6);
            trackNameElement.textContent = songName;
        }
        
        // 始终居中显示
        trackNameElement.style.textAlign = 'center';
    }
    
    // 在页面中添加样式
    function addPlayerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 使用CSS变量定义主题颜色，确保与系统暗色主题保持一致 */
            :root {
                --player-bg-color: #121212; /* Material Design暗色主题常用背景色 */
                --text-color: white;
                --button-bg-hover: rgba(255, 255, 255, 0.2);
                --player-fixed-width: 170px; /* 固定宽度，用户要求的170px */
            }
            
            /* 无论亮色还是暗色模式，播放器都使用与系统暗色主题一致的背景 */
            .music-player {
                display: flex;
                align-items: center;
                gap: 3px;
                padding: 3px 6px;
                height: 36px; /* 调整高度与搜索框一致 */
                width: var(--player-fixed-width); /* 固定宽度 */
                background-color: var(--player-bg-color);
                border-radius: 4px;
                z-index: 1000;
            }
            
            .music-button {
                background: transparent;
                border: none;
                color: var(--text-color);
                cursor: pointer;
                font-size: 12px;
                padding: 0;
                transition: all 0.1s ease;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                position: relative;
            }
            
            /* 为按钮添加默认的白色圆点 */
            .music-button::before {
                content: '';
                position: absolute;
                width: 6px;
                height: 6px;
                background-color: white;
                border-radius: 50%;
                opacity: 1;
            }
            
            /* 鼠标悬停时保持圆点显示，使其更突出 */
            .music-button:hover::before {
                opacity: 1;
                background-color: white;
                transform: scale(1.2); /* 稍微放大圆点增强交互感 */
            }
            
            .music-button:hover {
                background: var(--button-bg-hover);
            }
            
            .track-name {
                color: var(--text-color);
                font-size: 11px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100px; /* 稍微减小的宽度，适应内容显示 */
                text-align: center; /* 默认居中显示 */
            }
        `;
        document.head.appendChild(style);
    }
    
    // 将播放器添加到导航栏
    function addPlayerToNavigation() {
        console.log('开始添加播放器到导航栏');
        addPlayerStyles();
        const playerContainer = createMusicPlayer();
        
        // 打印当前页面的DOM结构，帮助调试
        console.log('当前页面导航栏相关元素:');
        console.log('md-header__inner:', document.querySelector('.md-header__inner'));
        console.log('md-header__end:', document.querySelector('.md-header__end'));
        console.log('md-header__option--icon.md-icon:', document.querySelector('.md-header__option--icon.md-icon'));
        
        // 尝试多种位置来添加播放器，确保总能显示
        let added = false;
        
        // 方法1: 在主题切换按钮之前
        const themeToggle = document.querySelector('.md-header__option--icon.md-icon');
        if (themeToggle && themeToggle.previousElementSibling) {
            themeToggle.parentNode.insertBefore(playerContainer, themeToggle);
            added = true;
            console.log('播放器已添加到主题切换按钮之前');
        }
        
        // 方法2: 添加到导航栏右侧
        if (!added) {
            const navRight = document.querySelector('.md-header__end');
            if (navRight) {
                navRight.prepend(playerContainer);
                added = true;
                console.log('播放器已添加到导航栏右侧');
            }
        }
        
        // 方法3: 添加到导航栏内部
        if (!added) {
            const navBar = document.querySelector('.md-header__inner');
            if (navBar) {
                navBar.appendChild(playerContainer);
                added = true;
                console.log('播放器已添加到导航栏内部');
            }
        }
        
        // 方法4: 添加到页面右上角（作为后备方案）
        if (!added) {
            playerContainer.style.position = 'fixed';
            playerContainer.style.top = '60px';
            playerContainer.style.right = '20px';
            playerContainer.style.zIndex = '9999';
            document.body.appendChild(playerContainer);
            console.log('播放器已添加到页面右上角');
        }
        
        console.log('播放器添加完成');
    }
    
    // 初始化音乐播放器
    async function initializePlayer() {
        try {
            await loadMusicFiles();
            addPlayerToNavigation();
            console.log('音乐播放器初始化完成');
        } catch (error) {
            console.error('音乐播放器初始化失败:', error);
        }
    }
    
    initializePlayer();
}

// 在DOM加载完成后初始化播放器
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicPlayer);
} else {
    initMusicPlayer();
}