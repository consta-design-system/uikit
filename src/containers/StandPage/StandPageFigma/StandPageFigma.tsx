import React from "react";
import { useFlag } from '@consta/uikit/useFlag';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { cn } from '##/utils/bem';
import { Loader } from '@consta/uikit/Loader';
import './StandPageFigma.css';

type Props = {
    link?: string;
    className?: string;
}

const cnStandPageFigma = cn('StandPageFigma');

const FigmaImage = () => (
    <svg className={cnStandPageFigma('Image')} width="177" height="177" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
            <path d="M95.875 62.6875H66.375C52.1191 62.6875 40.5625 51.1309 40.5625 36.875C40.5625 22.6191 52.1191 11.0625 66.375 11.0625H95.875V62.6875Z" fill="url(#paint0_linear_1811_29955)"/>
            <path d="M92.1875 114.312H66.375C52.1191 114.312 40.5625 102.756 40.5625 88.5C40.5625 74.2441 52.1191 62.6875 66.375 62.6875H92.1875V114.312Z" fill="url(#paint1_linear_1811_29955)"/>
            <path d="M66.375 165.938C52.1191 165.938 40.5625 154.381 40.5625 140.125C40.5625 125.869 52.1191 114.312 66.375 114.312H92.1875V140.125C92.1875 154.381 80.6309 165.938 66.375 165.938Z" fill="url(#paint2_linear_1811_29955)"/>
            <path d="M118 62.6875H92.1875V11.0625H118C132.256 11.0625 143.812 22.6191 143.812 36.875C143.812 51.1309 132.256 62.6875 118 62.6875Z" fill="url(#paint3_linear_1811_29955)"/>
            <path d="M118 114.312C132.256 114.312 143.812 102.756 143.812 88.5C143.812 74.2442 132.256 62.6875 118 62.6875C103.744 62.6875 92.1875 74.2442 92.1875 88.5C92.1875 102.756 103.744 114.312 118 114.312Z" fill="url(#paint4_linear_1811_29955)"/>
        </g>
        <defs>
            <linearGradient id="paint0_linear_1811_29955" x1="60.1394" y1="4.05994" x2="84.8973" y2="72.0759" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F44F5A"/>
                <stop offset="0.443" stopColor="#EE3D4A"/>
                <stop offset="1" stopColor="#E52030"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1811_29955" x1="57.6725" y1="53.9702" x2="82.2829" y2="121.581" gradientUnits="userSpaceOnUse">
                <stop stopColor="#AE4CD5"/>
                <stop offset="1" stopColor="#9331BF"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1811_29955" x1="54.6119" y1="97.1914" x2="80.4649" y2="168.213" gradientUnits="userSpaceOnUse">
                <stop stopColor="#33C481"/>
                <stop offset="1" stopColor="#21A366"/>
            </linearGradient>
            <linearGradient id="paint3_linear_1811_29955" x1="101.399" y1="1.888" x2="125.814" y2="68.9636" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F09CA2"/>
                <stop offset="1" stopColor="#EB6773"/>
            </linearGradient>
            <linearGradient id="paint4_linear_1811_29955" x1="105.883" y1="55.2093" x2="128.535" y2="117.447" gradientUnits="userSpaceOnUse">
                <stop stopColor="#32BDEF"/>
                <stop offset="1" stopColor="#1EA2E4"/>
            </linearGradient>
        </defs>
    </svg>
)

export const StandPageFigma = (props: Props) => {
    const { link, className } = props;
    const [isPreview, setIsPreview] = useFlag(true);
    const [isLoading, setIsLoading] = useFlag();

    const handleClick = () => {
        setIsPreview.off();
        setIsLoading.on();
    };

    return (
        <div className={cnStandPageFigma(null, [className])}>
            {(!isPreview && link) ? (
                <>
                    <iframe onLoad={setIsLoading.off} className={cnStandPageFigma('Frame')} src={link}/>
                    {isLoading && <Loader className={cnStandPageFigma('Loader')} />}
                </>
            ): (
                <>
                    <Text
                        className={cnStandPageFigma('Title')}
                        size="3xl"
                        lineHeight="m"
                        weight="semibold"
                    >
                        Превью компонента в Figma
                    </Text>
                    <Text
                        className={cnStandPageFigma('Title')}
                        size="m"
                        view="secondary"
                        lineHeight="m"
                    >
                        По умолчанию эта функция отключена чтобы не нагружать ваш браузер
                    </Text>
                    {link && (
                        <Button
                            className={cnStandPageFigma('Button')}
                            label="Я хочу увидеть компонент"
                            onClick={handleClick}
                            size="m"
                            view="secondary"
                        />
                    )}
                    <FigmaImage />
                </>
            )}
        </div>
    )
}