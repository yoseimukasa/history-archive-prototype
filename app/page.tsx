'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookOpenText, ChevronRight, FileText, Image as ImageIcon, LockKeyhole, MapPin, Menu, Play, Search, Settings2, UserRound, Video, X } from 'lucide-react';

type Period = '前期' | '中期' | '後期';
type EventItem = { year:number; date:string; period:Period; title:string; place:string; description:string; people:string[]; themes:string[]; photos:number; videos:number; texts:number; image:number };

const periods = [
  { label:'前期' as Period, years:'1920—1959', note:'創設と歩みのはじまり', index:'01' },
  { label:'中期' as Period, years:'1960—1999', note:'活動の広がりと継承', index:'02' },
  { label:'後期' as Period, years:'2000—現在', note:'新しい時代への展開', index:'03' },
];

const events:EventItem[] = [
  {year:1920,date:'1920年4月18日',period:'前期',title:'最初の集いが開かれる',place:'東町・旧公会堂',description:'地域の未来を語り合う、最初の小さな集いが開かれました。',people:['青木 遥','地域有志'],themes:['創設','地域活動'],photos:8,videos:0,texts:3,image:1},
  {year:1927,date:'1927年9月3日',period:'前期',title:'青年部による巡回活動を開始',place:'北部地域',description:'若い世代が各地を訪ね、活動の輪を少しずつ広げました。',people:['村井 健'],themes:['青年','交流'],photos:12,videos:0,texts:2,image:2},
  {year:1936,date:'1936年11月12日',period:'前期',title:'活動指針「共に歩む」を発表',place:'中央会館',description:'現在まで受け継がれる活動の基本姿勢が初めて文章にまとめられました。',people:['青木 遥'],themes:['理念','講話'],photos:4,videos:0,texts:6,image:1},
  {year:1948,date:'1948年6月20日',period:'前期',title:'復興支援の共同作業',place:'海浜地区',description:'生活の再建を目指し、地域を越えた支援活動が行われました。',people:['地域有志'],themes:['復興','奉仕'],photos:21,videos:1,texts:4,image:2},
  {year:1955,date:'1955年10月8日',period:'前期',title:'新しい本部会館が完成',place:'桜木町',description:'会員が集い、学び、記録を残すための新たな拠点が開館しました。',people:['第2期建設委員会'],themes:['会館','節目'],photos:34,videos:2,texts:7,image:3},
  {year:1964,date:'1964年5月16日',period:'中期',title:'全国文化交流会を開催',place:'東京・市民文化館',description:'各地の文化と経験を分かち合う、初の全国規模の催しとなりました。',people:['松岡 澄子','文化部'],themes:['文化','全国交流'],photos:46,videos:3,texts:5,image:3},
  {year:1973,date:'1973年8月25日',period:'中期',title:'海外との交流が始まる',place:'横浜港・国際会館',description:'国外からの訪問団を迎え、長く続く国際交流の礎を築きました。',people:['国際交流委員会'],themes:['国際交流','訪問'],photos:29,videos:4,texts:8,image:4},
  {year:1986,date:'1986年3月9日',period:'中期',title:'創立者の記録を編纂',place:'記録資料室',description:'散在していた写真・書簡・講話記録を集め、初の資料集を刊行しました。',people:['記録編纂委員会'],themes:['記録','出版'],photos:17,videos:1,texts:22,image:4},
  {year:1998,date:'1998年12月1日',period:'中期',title:'次世代への継承宣言',place:'中央会館',description:'世代を越えて理念を語り継ぐための、新たな方針が発表されました。',people:['石原 創','青年代表'],themes:['継承','青年'],photos:38,videos:6,texts:11,image:3},
  {year:2008,date:'2008年7月14日',period:'後期',title:'地域協働プロジェクトを開始',place:'全国12地域',description:'地域団体と力を合わせ、暮らしに根ざした活動を各地で始めました。',people:['地域連携室'],themes:['地域活動','協働'],photos:64,videos:8,texts:14,image:5},
  {year:2016,date:'2016年4月2日',period:'後期',title:'歴史資料デジタル化計画',place:'記録資料室',description:'貴重な原資料を未来へ残すため、写真と文書のデジタル化に着手しました。',people:['アーカイブ委員会'],themes:['デジタル','保存'],photos:23,videos:3,texts:31,image:5},
  {year:2024,date:'2024年11月10日',period:'後期',title:'世代をつなぐ対話の庭',place:'新緑記念館',description:'10代から90代までが一堂に集い、それぞれの記憶と未来像を語りました。',people:['会員有志','次世代委員会'],themes:['対話','未来'],photos:87,videos:12,texts:18,image:6},
];

type View = {name:'home'} | {name:'timeline';period:Period;focusYear?:number} | {name:'detail';item:EventItem} | {name:'search'};

function ArchiveImage({index,className='' }:{index:number;className?:string}) { return <div role="img" aria-label="架空の活動記録写真" className={`archive-img crop-${index} ${className}`} />; }

export default function Home(){
  const [view,setView]=useState<View>({name:'home'}); const [fontSize,setFontSize]=useState('standard'); const [query,setQuery]=useState(''); const [menu,setMenu]=useState(false);
  const results=useMemo(()=>events.filter(e=>`${e.year}${e.title}${e.place}${e.description}${e.people.join('')}${e.themes.join('')}`.includes(query.trim())),[query]);
  const go=(next:View)=>{setView(next);setMenu(false);window.scrollTo({top:0,behavior:'smooth'})};
  return <div className={`app font-${fontSize}`}>
    <header className="topbar">
      <button className="brand-mark" onClick={()=>go({name:'home'})} aria-label="トップへ戻る">HA</button>
      <div className="member-badge"><LockKeyhole size={13}/>会員限定アーカイブ</div>
      <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="メニューを開く"><Menu size={26}/></button>
    </header>
    {menu&&<div className="menu-panel"><button className="close" onClick={()=>setMenu(false)}><X/> 閉じる</button><nav><button onClick={()=>go({name:'home'})}>ホーム</button><button onClick={()=>go({name:'timeline',period:'前期'})}>年表を見る</button><button onClick={()=>go({name:'search'})}>資料を探す</button></nav><p>文字サイズ</p><div className="size-switch">{[['standard','標準'],['large','大'],['xlarge','特大']].map(([v,l])=><button className={fontSize===v?'active':''} onClick={()=>setFontSize(v)} key={v}>{l}</button>)}</div><div className="privacy"><LockKeyhole size={18}/><span><strong>このアーカイブは会員限定です</strong><small>掲載資料の外部共有はご遠慮ください</small></span></div></div>}
    {view.name==='home'&&<HomeView onPeriod={period=>go({name:'timeline',period})} onYear={year=>go({name:'timeline',period:year<=1959?'前期':year<=1999?'中期':'後期',focusYear:year})} onSearch={()=>go({name:'search'})}/>} 
    {view.name==='timeline'&&<TimelineView period={view.period} focusYear={view.focusYear} onBack={()=>go({name:'home'})} onPeriod={period=>go({name:'timeline',period})} onDetail={item=>go({name:'detail',item})}/>} 
    {view.name==='detail'&&<DetailView item={view.item} onBack={()=>go({name:'timeline',period:view.item.period})}/>} 
    {view.name==='search'&&<SearchView query={query} setQuery={setQuery} results={results} onBack={()=>go({name:'home'})} onDetail={item=>go({name:'detail',item})}/>} 
    <div className="quick-size"><Settings2 size={15}/><span>文字</span>{[['standard','標準'],['large','大'],['xlarge','特大']].map(([v,l])=><button className={fontSize===v?'active':''} onClick={()=>setFontSize(v)} key={v}>{l}</button>)}</div>
  </div>;
}

function HomeView({onPeriod,onYear,onSearch}:{onPeriod:(p:Period)=>void;onYear:(year:number)=>void;onSearch:()=>void}){return <main>
  <section className="hero"><p className="eyebrow">OFFICIAL HISTORY ARCHIVE</p><h1>受け継がれてきた<br/>記憶を、未来へ。</h1><p className="lead">1920年から現在まで。写真、映像、ことばとともに、私たちの歩みをたどります。</p><button className="search-entry" onClick={onSearch}><Search/><span>年代・人物・場所・言葉から検索</span><ChevronRight/></button></section>
  <section className="periods"><div className="section-heading"><div><p className="eyebrow">EXPLORE THE HISTORY</p><h2>年代を見る</h2></div></div><div className="history-chooser"><YearWheel onSelect={onYear}/><div className="period-side"><div className="period-side-head"><h3>時代区分から見る</h3><p className="provisional">区分は仮設定です</p></div><p className="config-note">区分名と年代は、ヒアリング後に管理画面から変更できます。</p><div className="period-grid">{periods.map(p=><button className="period-card" key={p.label} onClick={()=>onPeriod(p.label)}><span className="period-index">{p.index}</span><span className="period-copy"><strong>{p.label}</strong><small>{p.years}</small><em>{p.note}</em></span><span className="round-arrow"><ChevronRight/></span></button>)}</div></div></div></section>
  <section className="featured"><ArchiveImage index={6}/><div><p className="eyebrow">FEATURED MEMORY</p><h2>世代をつなぐ、<br/>それぞれの記憶。</h2><p>一つの出来事に、写真・映像・講話・文書をまとめて保存。出来事を入口に、多角的に歴史をたどれます。</p></div></section><Footer/></main>}

function YearWheel({onSelect}:{onSelect:(year:number)=>void}){const start=1920,end=new Date().getFullYear(),row=62;const years=useMemo(()=>Array.from({length:end-start+1},(_,i)=>start+i),[end]);const [selected,setSelected]=useState(1965);const wheel=useRef<HTMLDivElement>(null);useEffect(()=>{if(wheel.current)wheel.current.scrollTop=(selected-start)*row},[]);const moveTo=(year:number,behavior:ScrollBehavior='smooth')=>{const next=Math.max(start,Math.min(end,year));setSelected(next);wheel.current?.scrollTo({top:(next-start)*row,behavior})};return <div className="year-wheel-card"><div className="wheel-top"><span>YEAR SELECTOR</span><strong>{start} — {end}</strong></div><p>指で上下に回して年代を選択</p><div className="wheel-shell"><span className="wheel-rail left"/><span className="wheel-rail right"/><div className="wheel-selection" aria-hidden="true"><i/>SELECT YEAR<i/></div><div className="year-wheel" ref={wheel} role="listbox" aria-label="年代を選択" tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowUp'){e.preventDefault();moveTo(selected-1)}if(e.key==='ArrowDown'){e.preventDefault();moveTo(selected+1)}}} onScroll={e=>setSelected(Math.max(start,Math.min(end,start+Math.round(e.currentTarget.scrollTop/row))))}>{years.map(year=><button role="option" aria-selected={year===selected} className={year===selected?'selected':''} onClick={()=>moveTo(year)} key={year}>{year}<small>年</small></button>)}</div></div><div className="wheel-shortcuts"><button onClick={()=>moveTo(start)}>1920年へ</button><span>選択中 <strong>{selected}</strong></span><button onClick={()=>moveTo(end)}>現在へ</button></div><button className="year-confirm" onClick={()=>onSelect(selected)}><span><small>選択した年代へ</small>{selected}年付近の年表を見る</span><ChevronRight/></button></div>}

function TimelineView({period,focusYear,onBack,onPeriod,onDetail}:{period:Period;focusYear?:number;onBack:()=>void;onPeriod:(p:Period)=>void;onDetail:(e:EventItem)=>void}){const current=periods.find(p=>p.label===period)!;const items=events.filter(e=>e.period===period);return <main>
  <div className="page-head"><button className="back" onClick={onBack}><ArrowLeft/> トップへ</button><p className="eyebrow">HISTORY TIMELINE</p><h1>{period}<small>{current.years}</small></h1><p>{current.note}</p><div className="period-tabs">{periods.map(p=><button className={p.label===period?'active':''} onClick={()=>onPeriod(p.label)} key={p.label}>{p.label}</button>)}</div></div>
  <section className="timeline alternating-timeline">{focusYear&&<div className="year-arrival"><span>{focusYear}</span><p><strong>{focusYear}年を選択しました</strong><small>この年代に近い出来事を表示しています</small></p></div>}<p className="list-count">出来事 {items.length}件　<span>年代順</span></p>{items.map((item,index)=><article className={`timeline-item ${index%2===0?'side-left':'side-right'}`} key={item.year}><div className="year-node"><div className="year">{item.year}<small>年</small></div><div className="dot"/></div><button className="event-card" onClick={()=>onDetail(item)}><ArchiveImage index={item.image}/><div className="event-body"><time>{item.date}</time><h2>{item.title}</h2><p className="location"><MapPin/> {item.place}</p><p>{item.description}</p><MediaCounts item={item}/><span className="detail-link">詳しく見る <ChevronRight/></span></div></button></article>)}</section><Footer/></main>}

function MediaCounts({item}:{item:EventItem}){return <div className="media-counts"><span><ImageIcon/>写真 {item.photos}</span><span><Video/>映像 {item.videos}</span><span><FileText/>資料 {item.texts}</span></div>}

function DetailView({item,onBack}:{item:EventItem;onBack:()=>void}){return <main><div className="detail-hero"><button className="back light" onClick={onBack}><ArrowLeft/> {item.period}の年表へ</button><ArchiveImage index={item.image}/><div className="detail-title"><p>{item.date} ・ {item.place}</p><h1>{item.title}</h1><MediaCounts item={item}/></div></div>
  <div className="detail-content"><section className="summary"><p className="eyebrow">OVERVIEW</p><h2>出来事の概要</h2><p>{item.description} この出来事は、その後の活動方針にも影響を与え、多くの会員の記憶に残る節目となりました。ここでは、当時の写真・映像・文書を一つの出来事に結びつけて閲覧できます。</p></section>
  <section className="facts"><div><UserRound/><small>人物</small><strong>{item.people.join('、')}</strong></div><div><MapPin/><small>場所</small><strong>{item.place}</strong></div><div><BookOpenText/><small>テーマ</small><strong>{item.themes.join('、')}</strong></div></section>
  <section className="assets"><div className="asset-heading"><div><p className="eyebrow">PHOTOGRAPHS</p><h2>写真記録</h2></div><span>{item.photos}枚</span></div><div className="gallery"><ArchiveImage index={item.image}/><ArchiveImage index={item.image%6+1}/><ArchiveImage index={(item.image+1)%6+1}/></div><button className="outline-button">写真をすべて見る</button></section>
  <section className="assets dark-section"><div className="asset-heading"><div><p className="eyebrow">MOVING IMAGES</p><h2>映像記録</h2></div><span>{item.videos}本</span></div><button className="video-card"><ArchiveImage index={item.image%6+1}/><span className="play"><Play fill="currentColor"/></span><strong>{item.title} — 記録映像</strong><small>06:42</small></button></section>
  <section className="assets documents"><div className="asset-heading"><div><p className="eyebrow">DOCUMENTS & TALKS</p><h2>講話・テキスト資料</h2></div><span>{item.texts}件</span></div><button className="document-card"><FileText/><span><small>{item.date} 発行</small><strong>活動記録 第{String(item.year).slice(-2)}号</strong><em>「未来へ受け継ぐもの」より抜粋</em></span><ChevronRight/></button><button className="document-card"><BookOpenText/><span><small>講話記録</small><strong>{item.title}に寄せて</strong><em>当時の関係者による回想と記録</em></span><ChevronRight/></button></section></div><Footer/></main>}

function SearchView({query,setQuery,results,onBack,onDetail}:{query:string;setQuery:(q:string)=>void;results:EventItem[];onBack:()=>void;onDetail:(e:EventItem)=>void}){return <main><div className="search-page"><button className="back light" onClick={onBack}><ArrowLeft/> トップへ</button><p className="eyebrow">SEARCH THE ARCHIVE</p><h1>資料を探す</h1><p>年代・人物・場所・言葉から、すべての出来事を横断して検索できます。</p><label className="search-box"><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="例：1970年代　東京　交流"/><button onClick={()=>setQuery('')} aria-label="入力を消す"><X/></button></label><div className="suggestions"><span>検索例</span>{['創設','交流','中央会館','デジタル'].map(q=><button onClick={()=>setQuery(q)} key={q}>{q}</button>)}</div></div><section className="results"><p>{query?`「${query}」の検索結果 ${results.length}件`:'すべての出来事 12件'}</p>{(query?results:events).map(item=><button className="result-card" onClick={()=>onDetail(item)} key={item.year}><ArchiveImage index={item.image}/><span><small>{item.year} ・ {item.place}</small><strong>{item.title}</strong><em>{item.description}</em><MediaCounts item={item}/></span><ChevronRight/></button>)}{query&&results.length===0&&<div className="empty"><Search/><h2>一致する出来事はありません</h2><p>言葉を短くするか、別の言葉でお試しください。</p></div>}</section><Footer/></main>}

function Footer(){return <footer><span>団体歴史アーカイブ</span><span><LockKeyhole size={12}/> 会員限定</span><span>試作版 2026.09</span></footer>}
