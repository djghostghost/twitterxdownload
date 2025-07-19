import {Link} from '@heroui/react';
import {Search, Download} from 'lucide-react';
import {getTranslation} from "@/lib/i18n";
import {ThemeSwitcher} from "@/app/components/ui/ThemeSwitcher";

export default function MobileBottomNav({locale = 'en'}) {
    const t = function (key) {
        return getTranslation(locale, key);
    }
    return (
        <div className="fixed bottom-0 left-0 right-0 shadow border-t bg-background text-foreground border-gray-200 dark:border-gray-700  md:hidden flex justify-around items-center h-12 z-50">
            <Link href="/tweets" className="flex flex-col items-center text-xs">
                <Search size={20}/>
                {t('Search Tweets')}
            </Link>
            <Link href="/downloader" className="flex flex-col items-center text-xs ">
                <Download size={20}/>
                {t('Downloader')}
            </Link>
            <ThemeSwitcher/>
        </div>
    )
}