import * as React from 'react';
import { SVGProps } from 'react';

const ResponsesImageExit = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 378 271" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M83.5515 3.13942C82.9587 4.27171 83.6546 5.65314 84.911 5.83835L85.0198 5.85438C87.2531 6.18356 88.4329 8.69621 87.27 10.6469C86.6203 11.7368 87.2795 13.1406 88.5272 13.3245C90.7606 13.6537 91.9403 16.1663 90.7775 18.117C90.1278 19.2069 90.7869 20.6107 92.0347 20.7946C94.268 21.1238 95.4478 23.6364 94.2849 25.5871C93.6352 26.677 94.2943 28.0808 95.5421 28.2647C97.7754 28.5939 98.9552 31.1065 97.7923 33.0572C97.1426 34.1471 97.8018 35.5509 99.0495 35.7348L99.1583 35.7509C101.368 36.0765 102.592 38.5056 101.549 40.4967L100.83 41.8698C100.65 42.2135 100.228 42.3455 99.8866 42.1646C99.5456 41.9837 99.4156 41.5584 99.5956 41.2147L100.315 39.8415C100.908 38.7092 100.212 37.3278 98.9547 37.1426L98.846 37.1266C96.6126 36.7974 95.4329 34.2847 96.5957 32.334C97.2454 31.2442 96.5863 29.8404 95.3385 29.6564C93.1052 29.3273 91.9254 26.8146 93.0883 24.8639C93.738 23.7741 93.0789 22.3702 91.8311 22.1863C89.5978 21.8571 88.418 19.3445 89.5809 17.3938C90.2306 16.3039 89.5714 14.9001 88.3237 14.7162C86.0903 14.387 84.9106 11.8744 86.0734 9.92372C86.7231 8.83382 86.064 7.43002 84.8162 7.2461L84.7075 7.23007C82.498 6.90441 81.2744 4.47528 82.3169 2.48426L83.0358 1.11109C83.2158 0.767394 83.6381 0.635435 83.979 0.816355C84.3199 0.997275 84.4504 1.42256 84.2705 1.76625L83.5515 3.13942ZM125.957 5.34691L126.783 1.46841C126.864 1.08861 126.624 0.714914 126.247 0.633814C125.87 0.552714 125.499 0.794814 125.418 1.17471L124.592 5.05311C124.122 7.25771 125.105 9.51621 127.032 10.66C128.441 11.4967 129.16 13.1486 128.816 14.7612L127.99 18.6396C127.909 19.0195 128.149 19.3932 128.526 19.4743C128.903 19.5554 129.274 19.3132 129.355 18.9334L130.181 15.0549C130.651 12.8504 129.668 10.5918 127.741 9.44802C126.332 8.61142 125.613 6.95941 125.957 5.34691ZM17.8947 137.334L14.3128 138.983C12.8236 139.669 11.0672 139.318 9.95229 138.112C8.42796 136.464 6.02655 135.984 3.99057 136.921L0.408686 138.57C0.057892 138.732 -0.096855 139.149 0.063045 139.502C0.222946 139.855 0.636946 140.011 0.987736 139.849L4.56962 138.2C6.05881 137.515 7.81529 137.866 8.9302 139.072C10.4545 140.72 12.8559 141.2 14.8919 140.263L18.4738 138.614C18.8246 138.452 18.9793 138.035 18.8194 137.682C18.6595 137.328 18.2455 137.173 17.8947 137.334ZM5.57696 63.8207C4.53523 64.5539 3.0881 64.0298 2.7497 62.7969L2.33931 61.3016C2.23659 60.9274 1.8521 60.7082 1.48052 60.8121C1.10894 60.916 0.890986 61.3036 0.993706 61.6779L1.40409 63.1731C1.99914 65.3411 4.54377 66.2627 6.37557 64.9735L6.46574 64.9101C7.50025 64.182 8.93583 64.7477 9.20393 65.9891C9.68379 68.211 12.2533 69.2235 14.1049 67.9204C15.1394 67.1924 16.575 67.7581 16.8431 68.9995C17.323 71.2213 19.8925 72.2339 21.7441 70.9308C22.7786 70.2027 24.2142 70.7684 24.4823 72.0098C24.9622 74.2317 27.5316 75.2442 29.3833 73.9411C30.4178 73.2131 31.8534 73.7788 32.1215 75.0202C32.6013 77.242 35.1708 78.2546 37.0224 76.9515L37.1126 76.888C38.1543 76.1549 39.6015 76.679 39.9399 77.9119L40.3502 79.4074C40.453 79.7814 40.8375 80.0004 41.209 79.8964C41.5806 79.7924 41.7986 79.4054 41.6958 79.0309L41.2855 77.5356C40.6904 75.3676 38.1458 74.4461 36.314 75.7352L36.2238 75.7987C35.1893 76.5267 33.7537 75.961 33.4856 74.7197C33.0058 72.4978 30.4363 71.4852 28.5846 72.7883C27.5501 73.5164 26.1146 72.9507 25.8465 71.7093C25.3666 69.4874 22.7971 68.4749 20.9455 69.778C19.911 70.506 18.4754 69.9403 18.2073 68.6989C17.7274 66.4771 15.1579 65.4645 13.3063 66.7676C12.2718 67.4957 10.8362 66.93 10.5681 65.6886C10.0883 63.4667 7.51875 62.4542 5.66713 63.7573L5.57696 63.8207ZM58.6982 29.7678C61.005 29.9375 63.0136 28.1909 63.1847 25.8667C63.3557 23.5425 61.6243 21.5207 59.3176 21.351C57.0108 21.1813 55.0022 22.9278 54.8311 25.2521C54.6601 27.5763 56.3915 29.5981 58.6982 29.7678ZM153.813 18.6638C153.699 20.2133 152.36 21.3777 150.822 21.2645C149.284 21.1514 148.13 19.8035 148.244 18.254C148.358 16.7045 149.697 15.5402 151.235 15.6533C152.773 15.7665 153.927 17.1143 153.813 18.6638ZM152.421 18.5614C152.364 19.3361 151.694 19.9183 150.925 19.8617C150.156 19.8051 149.579 19.1312 149.636 18.3565C149.693 17.5817 150.363 16.9995 151.132 17.0561C151.901 17.1127 152.478 17.7866 152.421 18.5614ZM81.8481 76.6038C83.3859 76.717 84.725 75.5526 84.839 74.0031C84.953 72.4536 83.7988 71.1058 82.2609 70.9926C80.7231 70.8795 79.384 72.0438 79.27 73.5933C79.156 75.1428 80.3102 76.4907 81.8481 76.6038ZM81.9513 75.201C82.7202 75.2576 83.3897 74.6754 83.4468 73.9007C83.5038 73.1259 82.9266 72.452 82.1577 72.3954C81.3888 72.3388 80.7193 72.921 80.6623 73.6958C80.6052 74.4705 81.1824 75.1444 81.9513 75.201ZM56.7514 126.428C56.6374 127.978 55.2983 129.142 53.7604 129.029C52.2226 128.916 51.0684 127.568 51.1824 126.019C51.2964 124.469 52.6355 123.305 54.1733 123.418C55.7112 123.531 56.8654 124.879 56.7514 126.428ZM55.3591 126.326C55.3021 127.101 54.6326 127.683 53.8637 127.626C53.0947 127.57 52.5176 126.896 52.5746 126.121C52.6316 125.346 53.3012 124.764 54.0701 124.821C54.839 124.877 55.4161 125.551 55.3591 126.326ZM336.072 117.836C336.655 118.974 338.185 119.201 339.061 118.281L339.136 118.202C340.693 116.566 343.426 117.051 344.35 119.125C344.866 120.284 346.393 120.555 347.262 119.641C348.819 118.006 351.552 118.491 352.476 120.565C352.992 121.724 354.519 121.995 355.388 121.081C356.945 119.446 359.678 119.93 360.602 122.005C361.118 123.164 362.645 123.435 363.514 122.521C365.071 120.886 367.804 121.37 368.728 123.445C369.244 124.604 370.771 124.875 371.64 123.961L371.716 123.881C373.256 122.264 375.946 122.664 376.972 124.664L377.68 126.043C377.857 126.388 377.721 126.809 377.377 126.983C377.033 127.157 376.61 127.019 376.433 126.674L375.725 125.295C375.142 124.158 373.612 123.93 372.736 124.85L372.66 124.93C371.104 126.565 368.371 126.081 367.447 124.006C366.931 122.847 365.404 122.576 364.534 123.49C362.978 125.125 360.245 124.641 359.321 122.566C358.805 121.407 357.278 121.136 356.408 122.05C354.852 123.685 352.119 123.201 351.195 121.126C350.679 119.967 349.152 119.696 348.282 120.61C346.726 122.245 343.993 121.761 343.069 119.686C342.553 118.527 341.026 118.257 340.156 119.17L340.08 119.25C338.541 120.868 335.851 120.467 334.824 118.468L334.117 117.089C333.94 116.744 334.075 116.322 334.42 116.148C334.764 115.974 335.187 116.112 335.364 116.457L336.072 117.836ZM309.087 12.4062C311.385 12.668 313.462 11.0032 313.726 8.68761C313.99 6.37211 312.34 4.28271 310.042 4.02091C307.744 3.75911 305.667 5.42401 305.404 7.73951C305.14 10.0551 306.789 12.1444 309.087 12.4062ZM315.388 37.5698L311.738 39.0602C311.38 39.2061 311.207 39.6162 311.352 39.9761C311.496 40.3361 311.903 40.5095 312.26 40.3635L315.911 38.8732C317.986 38.026 319.292 35.9372 319.154 33.6876C319.053 32.0421 320.008 30.5143 321.526 29.8947L325.177 28.4043C325.534 28.2584 325.707 27.8483 325.563 27.4884C325.419 27.1285 325.012 26.955 324.654 27.101L321.004 28.5914C318.929 29.4385 317.622 31.5273 317.761 33.7769C317.862 35.4223 316.906 36.9502 315.388 37.5698ZM331.026 139.252C330.762 141.567 328.685 143.232 326.387 142.97C324.089 142.709 322.44 140.619 322.704 138.304C322.967 135.988 325.044 134.323 327.342 134.585C329.641 134.847 331.29 136.936 331.026 139.252ZM45.3866 173.97C47.6848 174.232 49.7616 172.567 50.0254 170.252C50.2892 167.936 48.64 165.847 46.3419 165.585C44.0437 165.323 41.9669 166.988 41.7031 169.304C41.4393 171.619 43.0885 173.709 45.3866 173.97ZM340.542 160.377L336.61 160.605C336.225 160.627 335.896 160.331 335.875 159.943C335.854 159.556 336.149 159.223 336.534 159.201L340.466 158.974C342.701 158.844 344.763 160.169 345.585 162.263C346.186 163.794 347.694 164.763 349.329 164.669L353.261 164.441C353.646 164.419 353.975 164.715 353.996 165.103C354.017 165.491 353.722 165.823 353.337 165.845L349.405 166.073C347.17 166.202 345.108 164.877 344.286 162.783C343.685 161.252 342.177 160.283 340.542 160.377ZM323.959 187.372C325.468 187.687 326.95 186.71 327.267 185.189C327.585 183.668 326.619 182.179 325.109 181.864C323.6 181.549 322.119 182.526 321.801 184.047C321.484 185.568 322.45 187.056 323.959 187.372ZM324.247 185.995C325.001 186.152 325.742 185.664 325.901 184.903C326.06 184.143 325.577 183.399 324.822 183.241C324.067 183.083 323.327 183.572 323.168 184.332C323.009 185.093 323.492 185.837 324.247 185.995ZM365.109 88.4104C364.243 89.7004 362.504 90.0494 361.223 89.1904C359.943 88.3314 359.607 86.5884 360.473 85.2984C361.339 84.0084 363.078 83.6594 364.359 84.5184C365.639 85.3784 365.975 87.1204 365.109 88.4104ZM363.95 87.6324C363.517 88.2774 362.647 88.4524 362.007 88.0224C361.367 87.5934 361.199 86.7214 361.632 86.0764C362.065 85.4314 362.935 85.2574 363.575 85.6864C364.215 86.1164 364.383 86.9874 363.95 87.6324ZM341.834 92.6124L345.383 90.8564C345.73 90.6854 346.149 90.8274 346.318 91.1744C346.487 91.5214 346.342 91.9424 345.995 92.1144L342.446 93.8694C340.429 94.8674 338.011 94.4634 336.443 92.8664C335.296 91.6984 333.527 91.4024 332.052 92.1324L328.504 93.8874C328.156 94.0594 327.737 93.9174 327.568 93.5694C327.399 93.2224 327.544 92.8014 327.892 92.6294L331.44 90.8744C333.457 89.8774 335.875 90.2814 337.443 91.8784C338.59 93.0464 340.359 93.3414 341.834 92.6124ZM283.435 19.5332C283.261 21.0771 281.877 22.1884 280.345 22.0155C278.813 21.8425 277.712 20.4507 277.886 18.9068C278.061 17.363 279.444 16.2516 280.976 16.4246C282.509 16.5976 283.609 17.9893 283.435 19.5332ZM282.048 19.3766C281.961 20.1485 281.269 20.7042 280.503 20.6177C279.737 20.5313 279.186 19.8354 279.274 19.0634C279.361 18.2915 280.052 17.7358 280.819 17.8223C281.585 17.9088 282.135 18.6047 282.048 19.3766ZM259.132 15.8199L262.369 13.5571C263.715 12.6163 264.313 10.9147 263.855 9.33261C263.228 7.16971 264.047 4.84321 265.887 3.55701L269.123 1.29421C269.44 1.07261 269.875 1.15161 270.095 1.47051C270.314 1.78951 270.235 2.22771 269.918 2.44931L266.681 4.71211C265.336 5.65281 264.737 7.35451 265.195 8.93651C265.822 11.0995 265.003 13.4259 263.164 14.7121L259.927 16.9749C259.61 17.1965 259.175 17.1176 258.956 16.7986C258.736 16.4797 258.815 16.0415 259.132 15.8199ZM199.496 270.074C198.858 270.253 198.226 269.773 198.226 269.111V249.314C198.226 248.734 197.733 248.275 197.154 248.317L183.383 249.307C184.089 253.68 184.682 257.737 184.682 260.771C184.682 261.366 184.204 261.848 183.614 261.848H155.707C155.423 261.848 155.15 261.734 154.95 261.531C154.75 261.327 154.638 261.052 154.639 260.765C154.649 258.898 155.414 257.299 156.122 256.21C156.407 255.772 156.691 255.403 156.93 255.117C156.311 254.142 155.66 252.741 154.995 251.066C154.1 248.812 153.123 245.919 152.118 242.567C151.887 241.797 151.654 241.001 151.42 240.183C150.963 248.15 150.514 256.135 150.19 261.937C150.159 262.503 149.698 262.948 149.136 262.954L119.592 263.285C119.307 263.288 119.032 263.176 118.829 262.973C118.626 262.771 118.512 262.495 118.512 262.207C118.512 261.612 118.725 260.956 118.972 260.378C119.231 259.771 119.582 259.125 119.964 258.511C120.557 257.561 121.29 256.587 121.962 255.922C121.812 255.013 121.632 253.949 121.429 252.753L121.428 252.749V252.747C119.988 244.25 117.422 229.106 116.311 215.398C115.225 202.011 115.564 187.262 116.427 173.711L117.535 159.503C118.089 153.429 118.691 147.872 119.234 143.136C118.918 142.624 118.728 142.022 118.653 141.392C118.306 138.472 118.128 135.053 118.12 131.384C116.848 133.491 115.48 135.879 114.007 138.607C111.282 143.649 109.986 149.026 109.306 153.455C109.022 155.305 108.839 157.166 108.656 159.026L108.65 159.085L108.649 159.099L108.633 159.259C108.525 160.351 108.418 161.444 108.288 162.533C108.052 163.631 107.351 164.578 106.279 164.971C105.909 165.106 105.536 165.167 105.188 165.178C105.112 165.464 105.025 165.765 104.926 166.071L103.916 168.39C103.629 168.87 103.278 169.332 102.851 169.679C102.28 170.143 101.513 170.438 100.639 170.199C99.9816 170.02 99.2426 169.742 98.4997 169.178C97.7589 168.616 97.0692 167.811 96.4405 166.648C95.2012 164.356 94.1511 160.581 93.4209 154.224C92.6703 147.69 94.1532 138.705 96.6595 130.183C99.1689 121.649 102.76 113.394 106.356 108.319C109.933 103.27 114.938 98.4574 119.429 94.8024C121.679 92.9704 123.815 91.4174 125.599 90.2614C127.291 89.1634 128.764 88.3584 129.733 88.0614C137.339 82.7754 149.632 82.3984 156.786 86.3194L156.796 86.2824C157.743 86.5454 158.892 87.1454 160.196 87.9914C160.739 88.3444 161.319 88.7464 161.937 89.1984C162.708 89.6834 163.473 90.2314 164.24 90.8384C169.57 95.5434 178.345 104.764 184.227 117.335C179.489 121.238 173.238 123.878 167.997 124.57C169.809 127.023 171.818 129.956 174.066 133.522C177.146 138.407 178.731 143.711 179.63 148.023C180.08 150.183 180.36 152.105 180.567 153.606L180.646 154.182L180.647 154.185L180.648 154.194L180.649 154.199V154.202C180.717 154.702 180.777 155.137 180.834 155.512C180.915 156.044 180.979 156.375 181.034 156.552C181.115 156.815 181.221 156.958 181.308 157.04C181.397 157.124 181.506 157.183 181.642 157.22C181.942 157.3 182.305 157.25 182.532 157.169L183.634 156.775L183.924 157.918C184.138 158.764 184.56 159.968 185.104 160.854C185.378 161.302 185.635 161.586 185.842 161.728C186.013 161.844 186.08 161.826 186.137 161.805C186.619 161.633 187.065 161.417 187.496 161.046C187.929 160.673 188.395 160.101 188.849 159.156C189.773 157.232 190.601 153.859 191.011 147.791C191.413 141.851 190.275 133.642 187.747 125.636C186.856 122.815 185.799 120.039 184.587 117.408L186.133 116.69C179.99 103.458 170.722 93.8314 165.226 89.0434V54.6778C165.226 54.1002 165.714 53.6428 166.29 53.6798L198.226 55.7324V26.1114C198.226 25.4161 198.918 24.933 199.571 25.1727L297.571 61.1727C297.964 61.3173 298.226 61.6922 298.226 62.1114V241.611C298.226 242.059 297.927 242.453 297.496 242.574L199.496 270.074ZM296.226 62.8094L200.226 27.5441V267.792L296.226 240.853V62.8094ZM216.762 245.084C216.134 245.232 215.531 244.756 215.531 244.111V188.111C215.531 187.584 215.94 187.148 216.465 187.113L284.054 182.613C284.631 182.575 285.12 183.033 285.12 183.611V228.111C285.12 228.575 284.801 228.977 284.35 229.084L216.762 245.084ZM217.531 189.047V242.847L283.12 227.32V184.68L217.531 189.047ZM216.553 173.111C215.992 173.123 215.531 172.672 215.531 172.111V124.611C215.531 124.009 216.059 123.544 216.656 123.619L284.245 132.145C284.745 132.208 285.12 132.633 285.12 133.137V170.611C285.12 171.155 284.685 171.599 284.142 171.611L216.553 173.111ZM217.531 125.745V171.089L283.12 169.633V134.019L217.531 125.745ZM285.12 119.611C285.12 120.239 284.548 120.712 283.931 120.593L216.342 107.593C215.871 107.502 215.531 107.09 215.531 106.611V51.1114C215.531 50.4207 216.215 49.9379 216.866 50.169L284.455 74.169C284.854 74.3107 285.12 74.6883 285.12 75.1114V119.611ZM217.531 52.5277V105.785L283.12 118.4V75.8175L217.531 52.5277ZM209.173 149.503C209.807 148.741 210.174 147.753 210.174 146.884C210.174 146.026 209.817 145.112 209.207 144.418C208.602 143.729 207.868 143.384 207.174 143.384C206.48 143.384 205.746 143.729 205.141 144.418C204.531 145.112 204.174 146.026 204.174 146.884C204.174 147.753 204.541 148.741 205.176 149.503C205.809 150.264 206.538 150.611 207.174 150.611C207.81 150.611 208.539 150.264 209.173 149.503ZM207.174 152.611C209.936 152.611 212.174 149.645 212.174 146.884C212.174 144.122 209.936 141.384 207.174 141.384C204.413 141.384 202.174 144.122 202.174 146.884C202.174 149.645 204.413 152.611 207.174 152.611ZM121.209 144.669C129.114 148.468 152.962 153.777 168.886 145.289L168.894 145.285C175.49 171.904 177.264 199.678 178.595 226.963V226.965V226.967C178.687 228.85 178.762 230.376 178.827 231.483C179.124 236.524 180.041 242.115 180.884 247.254L180.923 247.496C181.695 252.206 182.387 256.476 182.522 259.693H156.901C157.095 258.827 157.488 258.039 157.908 257.392C158.199 256.945 158.489 256.586 158.705 256.34C158.813 256.218 158.901 256.125 158.96 256.065C158.979 256.046 158.994 256.03 159.007 256.018L159.024 256.001L159.037 255.988C159.462 255.591 159.496 254.925 159.114 254.487C158.597 253.893 157.861 252.488 156.978 250.264C156.113 248.089 155.157 245.261 154.162 241.943C152.172 235.31 150.046 226.776 148.212 217.717C146.379 208.658 144.841 199.092 144.024 190.393C143.205 181.671 143.119 173.904 144.143 168.403C144.251 167.818 143.87 167.255 143.29 167.145C142.711 167.035 142.153 167.42 142.044 168.005C140.963 173.811 141.074 181.823 141.898 190.596C142.724 199.391 144.275 209.036 146.12 218.148C147.223 223.598 148.432 228.864 149.657 233.652C149.108 243.132 148.522 253.499 148.114 260.81L120.984 261.114C121.185 260.664 121.458 260.162 121.772 259.659C122.475 258.532 123.277 257.563 123.762 257.189C124.075 256.947 124.23 256.55 124.166 256.158C124.001 255.149 123.793 253.919 123.553 252.504V252.503L123.536 252.401L123.533 252.383L123.532 252.378L123.531 252.371V252.369L123.53 252.364C122.088 243.855 119.542 228.825 118.439 215.222C117.36 201.908 117.702 187.21 118.568 173.696L119.701 159.278C120.192 153.933 120.72 148.993 121.209 144.669ZM118.181 127.234C118.192 126.875 118.205 126.516 118.219 126.154C112.988 126.309 106.801 125.196 101.906 121.553C100.732 124.473 99.6456 127.605 98.7069 130.796C96.2292 139.221 94.8413 147.873 95.5423 153.976C96.2638 160.256 97.277 163.695 98.3153 165.616C98.8255 166.56 99.3286 167.111 99.7836 167.456C100.238 167.801 100.699 167.983 101.197 168.119C101.246 168.133 101.324 168.152 101.512 167.999C101.73 167.823 101.986 167.49 102.247 166.993C102.763 166.011 103.135 164.71 103.313 163.805L103.535 162.673L104.639 162.974C104.868 163.037 105.241 163.058 105.55 162.945C105.791 162.857 106.055 162.673 106.189 162.131C106.606 160.438 106.725 158.647 106.842 156.864L106.843 156.856V156.853C106.926 155.596 107.009 154.342 107.196 153.125C107.896 148.564 109.245 142.918 112.132 137.575C114.373 133.428 116.376 130.046 118.181 127.234ZM169.916 174.522C170.284 174.997 169.934 175.6 169.316 175.6C168.699 175.6 167.017 173.501 166.715 172.954C165.94 171.552 165.027 169.313 164.347 165.859C163.685 162.503 163.251 160.432 162.983 159.203C162.849 158.589 162.757 158.186 162.699 157.939C162.574 157.411 162.317 155.84 163.141 155.84C164.376 155.84 164.574 156.469 165.062 158.707C165.55 160.945 165.998 163.191 166.441 165.438C167.085 168.706 167.93 170.727 168.58 171.905L169.916 174.522ZM131.793 56.8463C130.281 55.2413 129.61 53.6973 130.135 52.5819C131.202 50.3114 136.816 50.6772 142.674 53.3991C145.897 54.8966 148.522 56.7952 150.054 58.5784C152.477 61.19 153.889 64.7419 153.712 68.6035C153.71 68.6606 153.707 68.7176 153.703 68.7745C153.265 76.3644 146.813 82.2634 139.213 81.9814C133.429 81.7674 128.635 78.0337 126.788 72.9128C124.798 72.5285 123.346 70.9665 123.429 69.1558C123.499 67.6409 124.623 66.3791 126.17 65.8691C126.799 62.1547 128.884 58.9529 131.793 56.8463ZM134.002 58.7885C131.407 60.442 129.526 63.1466 128.988 66.3232L128.697 68.0421L127.042 68.5877C126.734 68.689 126.529 68.8462 126.415 68.9796C126.309 69.1042 126.288 69.1979 126.285 69.2616C126.282 69.3304 126.298 69.4605 126.457 69.637C126.625 69.8224 126.927 70.0193 127.353 70.1017L128.932 70.4065L129.477 71.9191C130.946 75.9909 134.756 78.9506 139.344 79.1204C142.062 79.2214 144.595 78.3265 146.591 76.7617C145.242 75.7051 144.007 74.5119 142.906 73.2035C143.39 72.818 143.828 72.3163 144.176 71.717C145.335 69.718 145.048 67.3912 143.536 66.52C142.281 65.7974 140.576 66.3033 139.37 67.6379C138.398 65.5331 137.713 63.2705 137.362 60.9022C136.117 60.2401 134.985 59.5235 134.002 58.7885Z"
    />
  </svg>
);
export default ResponsesImageExit;