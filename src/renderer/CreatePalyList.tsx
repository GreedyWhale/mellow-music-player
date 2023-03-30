import type { Component } from "solid-js";
import type { Rules } from "~/lib/validator";

import clsx from "clsx";
import { Index, For, createSignal } from "solid-js";

import { TitleBar } from "~/renderer/components/TitleBar";

import { useProcessMessage } from "~/hooks/useProcessMessage";
import { twMerge } from "~/lib/twMerge";
import { emojiJSON, showEmoji } from "~/lib/emoji";
import { validator } from '~/lib/validator';
import { ACTION_ADD_PLAYLIST } from '~/lib/constants';

const emojiList = Object.entries(emojiJSON);

export const CreatePalyList: Component = () => {
  const { message } = useProcessMessage();
  const [tabIndex, setTabIndex] = createSignal(0);
  const [selectedEmoji, setSelectedEmoji] = createSignal<string[]>();
  const [playlistName, setPlaylistName] = createSignal('');

  const handleSubmit = () => {
    const dataSource = {
      name: playlistName(),
      emoji: selectedEmoji(),
    };

    const rules: Rules<typeof dataSource> = [
      { key: 'name', required: true, message: '歌单名必填' },
      { key: 'emoji', required: true, message: '请选择一个图标'},
    ];

    const errors = validator(dataSource, rules);

    if (Object.keys(errors).length) {
      alert(Object.values(errors)[0][0]);
      return;
    }

    if (message()) {
      BridgeAPI.sendMessage({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        senderId: message()!.receiverId,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        receiverId: message()!.senderId ,
        payload: {
          action: ACTION_ADD_PLAYLIST,
          item: {
            name: playlistName,
            icon: selectedEmoji,
            songs: [],
          },
        },
      });
    }
  };

  return (
    <div>
      <TitleBar title="创建歌单" />

      <div class="p-5">
        <h4 class="mb-2 text-xl text-white">歌单名</h4>
        <input
          type="text"
          placeholder="请输入歌单名"
          class={twMerge(
            clsx(
              "w-full border-b border-[#3a3f42] bg-transparent py-2 text-sm text-white outline-none transition-all mb-5",
              "focus:border-b-[#DC4E09]"
            )
          )}
          onChange={event => setPlaylistName((event.target as HTMLInputElement).value)}
        />

        <h4 class="mb-3 text-xl text-white">图标</h4>
        <p class="mb-2 text-base text-[#9CA3AF]">
          已选图标：
          {selectedEmoji() && showEmoji(selectedEmoji() as string[])}
        </p>

        <div class="mb-5">
          <ul class="mb-4 flex items-center overflow-y-auto text-white">
            <Index each={emojiList}>
              {(item, index) => (
                <li
                  class={clsx(
                    "flex-none cursor-pointer break-keep py-4 [&:not(:last-child)]:mr-5",
                    index === tabIndex() && "border-b-2 border-b-[#DC4E09]"
                  )}
                  onClick={() => setTabIndex(index)}
                >
                  {item()[0]}
                </li>
              )}
            </Index>
          </ul>

          <ul class="flex h-[150px] flex-wrap overflow-x-auto rounded border border-[#3a3f42] p-5">
            <For each={emojiList[tabIndex()][1]}>
              {(item) => (
                <li
                  class={twMerge(
                    clsx(
                      "mb-2 w-[5%] flex-none cursor-pointer text-center text-2xl"
                    )
                  )}
                  onClick={() => setSelectedEmoji(item)}
                >
                  {showEmoji(item)}
                </li>
              )}
            </For>
          </ul>
        </div>

        <button
          class="bold w-[150px] rounded-[20px] bg-gradient-button border-2 border-[#DB4508] py-2 text-white"
          onClick={handleSubmit}
        >
          提交
        </button>
      </div>
    </div>
  );
};
