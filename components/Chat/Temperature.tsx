import { FC, useEffect, useRef, useState } from "react";

interface Props {
    onChangeTemp: (temp: number) => void;
}

export const Temperature: FC<Props> = ({onChangeTemp}) => {
    const [value, setValue] = useState<string>("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value;
        const valueNum = parseFloat(value);
        let temp = 0.7;
        if (!isNaN(valueNum)) {
            temp = valueNum > 2 ? 2.0 : (valueNum < 0 ? 0 : valueNum);
        }
        onChangeTemp(temp)
        setValue(value)
    };

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
        }
    }, [value]);


    return (
        <div className="flex flex-col">
            <label className="text-left dark:text-neutral-400 text-neutral-700 mb-2">Temperature</label>
            <label className="text-left dark:text-neutral-400 text-neutral-700 mb-2">What sampling temperature to use,
                between 0.0 and 2.0. Higher values like 0.8 will make the output more random, while lower values like
                0.2
                will make it more focused and deterministic.</label>
            <textarea
                ref={textareaRef}
                className="w-full rounded-lg px-4 py-2 focus:outline-none dark:bg-[#40414F] dark:border-opacity-50 dark:border-neutral-800 dark:text-neutral-100 border border-neutral-500 shadow text-neutral-900"
                style={{
                    resize: "none",
                    bottom: `${textareaRef?.current?.scrollHeight}px`,
                    maxHeight: "300px",
                    overflow: `${textareaRef.current && textareaRef.current.scrollHeight > 400 ? "auto" : "hidden"}`
                }}
                placeholder="0.7"
                value={value}
                rows={1}
                onChange={handleChange}
            />
        </div>
    );
};
