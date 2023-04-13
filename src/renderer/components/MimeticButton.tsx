import type { Component, JSXElement } from "solid-js";

import { createSignal, createMemo } from "solid-js";
import clsx from "clsx";

import addIcon from "~/assets/images/add.svg";
import editIcon from "~/assets/images/edit.svg";
import musicAddIcon from "~/assets/images/music_add.svg";
import musicPlayIcon from "~/assets/images/music_play.svg";
import backIcon from "~/assets/images/back.svg";

import { twMerge } from "~/lib/twMerge";
import { showEmoji } from "~/lib/emoji";

type ButtonIcons = "add" | "edit" | "musicAdd" | "musicPlay" | "back";

type ButtonProps = {
  icon?: ButtonIcons;
  emoji?: string[];
  onClick?: (event: MouseEvent) => void;
  children?: JSXElement;
  classNames?: string;
};

export const Button: Component<ButtonProps> = (props) => {
  const [active, setActive] = createSignal(false);

  const memoizedIcon = createMemo(() => {
    if (!props.icon) {
      return;
    }

    const iconMap: Record<ButtonIcons, string> = {
      add: addIcon,
      edit: editIcon,
      musicAdd: musicAddIcon,
      musicPlay: musicPlayIcon,
      back: backIcon,
    };

    return iconMap[props.icon];
  });

  return (
    <div
      class={twMerge(clsx("relative z-10 h-[40px] w-[40px]", props.classNames))}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      <button
        class="z-[1] flex h-full w-full items-center justify-center rounded-full bg-gradient-radial-tl from-[#2E3238] to-[#1D1F22]"
        onClick={(event) => props?.onClick?.(event)}
      >
        {memoizedIcon() && (
          <img src={memoizedIcon()} alt="button icon" class="h-5 w-5" />
        )}

        {props.emoji && <span>{showEmoji(props.emoji)}</span>}

        {props.children}
      </button>
      <div
        class={twMerge(
          clsx(
            "absolute top-[-2px] left-[-2px] z-[-1] h-[44px] w-[44px] rounded-full bg-gradient-to-br from-[#2B3036] to-[#292a2a] shadow-[4px_4px_12px_3px_rgba(0,0,0,.4),-3px_-2px_12px_#575c64] transition-all",
            active() &&
              "!shadow-[inset_-3px_-2px_12px_#292b2f,inset_4px_4px_12px_3px_rgba(0,0,0,.4)]"
          )
        )}
      />
    </div>
  );
};
