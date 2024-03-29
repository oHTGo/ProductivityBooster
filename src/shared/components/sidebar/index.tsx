import Email from '@shared/components/email';
import { variants, sizes, sidebarFeatures } from '@shared/components/sidebar/configurations';
import Tools from '@shared/components/tools';
import { MAX_Z_INDEX } from '@shared/configurations/twind';
import useAppDispatch from '@shared/hooks/use-app-dispatch';
import useAppSelector from '@shared/hooks/use-app-selector';
import { getEmails } from '@shared/slices/email';
import { collapse, expand, getIsExpanded, getIsOpen, getUI, setUI } from '@shared/slices/sidebar';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRef, type FC } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import type { Feature } from '@shared/types/commons';

type SidebarProps = {
  onClickOutside?: () => void;
};
const Sidebar: FC<SidebarProps> = ({ onClickOutside }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = useAppSelector(getIsOpen);
  const isExpanded = useAppSelector(getIsExpanded);
  const ui = useAppSelector(getUI);
  const emails = useAppSelector(getEmails);
  const dispatch = useAppDispatch();

  const renderView = (feature: Feature) => {
    switch (feature) {
      case 'email': {
        return <Email />;
      }
      case 'tools': {
        return <Tools />;
      }
      default:
        return <></>;
    }
  };
  const renderBadge = (feature: Feature) => {
    switch (feature) {
      case 'email':
        return emails.length !== 0 ? `${emails.length}` : '';
      default:
        return '';
    }
  };

  useOnClickOutside(ref, (event: MouseEvent & { target?: Element }) => {
    if (event?.target?.tagName?.toLowerCase() === chrome.runtime.getManifest().name) return;
    if (onClickOutside) onClickOutside();
  });

  return (
    <motion.div
      ref={ref}
      initial={'closed'}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      className={classNames(
        'fixed ml-2 top-2 h-[calc(100%-1rem)] rounded-md border border-slate-300 bg-stone-50 shadow-2xl',
        MAX_Z_INDEX,
        'flex',
      )}>
      <div
        className={classNames(
          'w-11 h-full inline-flex flex-col justify-center items-center border-0',
          isExpanded ? 'border-slate-300' : 'border-transparent',
        )}>
        {sidebarFeatures.map(({ Icon, feature }, key) => (
          <div className="relative w-11 h-11 py-2" key={key}>
            <Icon
              className={classNames(
                'h-8 w-8 cursor-pointer rounded-md p-1 hover:bg-stone-200',
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                {
                  'bg-stone-300 hover:bg-stone-300': ui === feature,
                },
              )}
              onClick={() => {
                if (ui === feature) return dispatch(collapse());

                dispatch(setUI(feature));
                dispatch(expand());
              }}
            />
            {renderBadge(feature) !== '' && (
              <span
                className={classNames(
                  'w-3 h-3 rounded-sm z-10 absolute top-1/2 left-1',
                  'text-white bg-red-500 text-[0.6rem] whitespace-nowrap',
                  'inline-flex justify-center items-center',
                  'select-none pointer-events-none',
                )}>
                {renderBadge(feature)}
              </span>
            )}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          width: isExpanded ? sizes.md : '0',
          borderLeftWidth: isExpanded ? '1px' : '0px',
        }}
        className={classNames('h-full border-0 border-slate-300', 'flex flex-col')}>
        <h4 className="h-8 w-full prose prose-h4 flex justify-center items-center font-semibold border-b-2 select-none">
          {ui.toUpperCase()}
        </h4>
        <div className="flex-1 overflow-auto w-full flex flex-col">{renderView(ui as Feature)}</div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
