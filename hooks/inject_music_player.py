# MkDocs hook to inject music player script into every page

import os
import json

def on_page_content(html, page, config, files):
    # 添加调试信息
    print(f"处理页面: {page.url}")
    
    # 检查是否已经注入了音乐播放器脚本，避免重复注入
    if 'music_player.js' not in html:
        print("注入音乐播放器脚本...")
        
        # 为了调试，添加测试脚本
        debug_script = '''
        <script>
            console.log('音乐播放器注入脚本已加载');
            console.log('页面URL:', window.location.href);
        </script>
        '''
        
        # 扫描music目录下的所有MP3文件
        music_dir = os.path.join(config.docs_dir, 'music')
        music_files = []
        if os.path.exists(music_dir):
            for file in os.listdir(music_dir):
                if file.lower().endswith('.mp3'):
                    music_files.append(file)
        print(f"扫描到的音乐文件数量: {len(music_files)}")
        
        # 生成包含音乐文件列表的JavaScript变量
        music_list_script = f'''
        <script>
            // 自动生成的音乐文件列表
            window.musicFileList = {json.dumps(music_files)};
            console.log(`自动加载的音乐文件数量: ${{window.musicFileList.length}}`);
        </script>
        '''
        
        # 使用相对路径注入脚本，避免在GitHub Pages子目录部署时出现404错误
        # 相对路径会根据当前页面位置自动调整
        script_path = 'assets/music_player.js'
        
        print(f"使用相对路径: {script_path}")
        
        # 在页面底部注入音乐播放器脚本
        script_injection = f'''
        {music_list_script}
        <script src="{script_path}"></script>
        '''
        
        html = html.rstrip()
        if html.endswith('</body>'):
            print("在</body>标签前插入脚本")
            # 如果页面以</body>结尾，则在其前面添加脚本
            html = html[:-7] + debug_script + script_injection + '</body>'
        else:
            print("在页面末尾添加脚本")
            # 否则直接添加到页面末尾
            html += debug_script + script_injection
        
        print("音乐播放器脚本注入完成")
    else:
        print("页面已包含音乐播放器脚本，跳过注入")
    
    return html