import { format } from 'date-fns';
import moment from 'moment';
import { commaify } from '../../util/commaify';
import { ellipsisSandwich } from '../../util/ellipsisSandwich';
import { EmptyState } from './EmptyState';

const TRANSACTIONS = [
    {
      "id": 1,
      "employeeId": 1,
      "timeCreated": "2022-03-28T16:54:01.639Z",
      "timePaid": "2022-03-28T16:54:01.667Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:54:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6pfpp5r8x3295gwfmm98wj5fuvg8nwkp878w2y75x9d9tvpn8zgjvtmvtsdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5k65d3p35r969xs8alq29qf8nh7pdf774l5g7u39wahpqad7jg7vs9qyyssqtwxjnduch48gu30fxvs5jv3fctx2lt6phyla85j3yn5jp6kkhn0kdn0epqjmpfpdr5llqafvqwcmdn9zqrm3ee7f03y3ejxkxyzxevcphys3v3",
      "paymentHash": "Gc0VFohyd7Kd0qJ4xB5usE/juUT1DFaVbAzOJEmL2xc=",
      "amount": "150"
    },
    {
      "id": 2,
      "employeeId": 1,
      "timeCreated": "2022-03-28T16:55:01.847Z",
      "timePaid": "2022-03-28T16:55:01.880Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:55:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6r9pp57l88zhw86qrt4zpkwhctvly55sgkmmesvyse5kk86z9y2mkscfeqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp58q8dxcrfl3l9agg3v8475yz43x5stskpy40ayudecmep9fcqxr2q9qyyssquh9qt3rlwm4465yfq2gaa38zh3hy9h22ylpz338g37hql3hcyc4phtrnd4gxcd6zy79jmkc9rpga86qqkyef5fpnyccckxp5yqp9nrqpc9fh24",
      "paymentHash": "985xXcfQBrqINnXwtnyUpBFt7zBhIZpax9CKRW7QwnI=",
      "amount": "150"
    },
    {
      "id": 3,
      "employeeId": 2,
      "timeCreated": "2022-03-28T16:55:01.848Z",
      "timePaid": "2022-03-28T16:55:01.866Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:55:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr6r9pp529zce8p3g0dx3cxxnnyxgvmzheg9498s34c0ljqlunhung3e2w0sdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5y3tfsxw3mc3d0k4ftltynkj48wtkvfjap8hjq4hcmpkw0qmvfyzq9qyyssqza98qxuakduh2gretjycu7f8lthg6jmlh70vhscafck98durr623nxm40d5fu7r9297wv2h9fgrlrkkukxfdvw3rx7fz5l9fr6hvuvqqvzsv6y",
      "paymentHash": "UUWMnDFD2mjgxpzIZDNivlBalPCNcP/IH+TvyaI5U58=",
      "amount": "250"
    },
    {
      "id": 4,
      "employeeId": 2,
      "timeCreated": "2022-03-28T16:56:01.071Z",
      "timePaid": "2022-03-28T16:56:01.091Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:56:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr69ppp5j85w5csk6gdfxrf2c8v2f0te277q3aqgwepryaljyzac9umdaswqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5h76vc0dpvswqy8v792achgkcfh4v2ze5fs2r0mz472t3e409l69q9qyyssqd5d7l3wvgqwc4jvxlapy7cjug5pv4kf6pjhra76yes8v3c0zkp38sqp9h6x92d5fl9m4xs792yt3dczjlmxa296qfq3xwq5vqhxetqqp5mxxtj",
      "paymentHash": "kejqYhbSGpMNKsHYpL15V7wI9Ah2QjJ38iC7gvNt7Bw=",
      "amount": "250"
    },
    {
      "id": 5,
      "employeeId": 1,
      "timeCreated": "2022-03-28T16:56:01.074Z",
      "timePaid": "2022-03-28T16:56:01.104Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:56:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr69ppp5ltyxwf0h8ahe4m9sk9n3meh4skdshwvx593wmrst78pdxez2cftqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5885l6q6f82w0awtsmcn0h20lxvhp8x5qlp4m4tqgdm0pfwqymtvq9qyyssq55v9ufhu0l7vw0u4zt09sl79jzttt3tjlw00jlvjw2crdwg5fmq8vqvnm86zvd7emf03j5263f5968y80qwy5vgmj6ztayrjszunwlgpny25y8",
      "paymentHash": "+shnJfc/b5rssLFnHeb1hZsLuYahYu2OC/HC02RKwlY=",
      "amount": "150"
    },
    {
      "id": 6,
      "employeeId": 1,
      "timeCreated": "2022-03-28T16:57:01.301Z",
      "timePaid": "2022-03-28T16:57:01.323Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:57:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6xapp5q2x82mkxx79cmg5xyfwvd37lrv8dhnv69ff43ech5ggh98prnefsdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp52ug00rcfuy4rfjuxx5wxg9r3t2fj2lsrzewvp32ehagzhuqfjqfs9qyyssqwzh0dverwrymwaszsslyc76l9pgdez2stydd02ha7nlvwmap5264xz90k8cu09pk8ra0kuzf686dz9nrlam7plc06m308n8y7hdl4hqqc05s84",
      "paymentHash": "Aox1bsY3i42ihiJcxsffGw7bzZoqU1jnF6IRcpwjnlM=",
      "amount": "150"
    },
    {
      "id": 7,
      "employeeId": 2,
      "timeCreated": "2022-03-28T16:57:01.303Z",
      "timePaid": "2022-03-28T16:57:01.339Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:57:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr6xapp583p0dw0dxw9sz6dk3fdfn6zhkvddu42zk8fuqkdnklzhgd7ap94sdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp58d9el5gau6arrk93vzd06snm9z5udehahym7mcfraztlv96y25ss9qyyssqh3wn339hkuajdpzxj6qtq26ncjnkmg032nz833jqwde8rn76esap3edh4lkgrk5lnsp9j440q08ugshg6ggjg8defyxqk4ewp3q3t8qpg5hc7z",
      "paymentHash": "PEL2ue0ziwFptopamehXsxreVUKx08BZs7fFdDfdCWs=",
      "amount": "250"
    },
    {
      "id": 8,
      "employeeId": 2,
      "timeCreated": "2022-03-28T16:58:01.518Z",
      "timePaid": "2022-03-28T16:58:01.549Z",
      "isPaid": false,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:58:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr6gepp5dty54ue9halq995cefhhuezqh6n2x2aeffrdqut87yelsh703nzqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp50uwdk4h9pjg5fze8xj59z9cyxgwmk4342m08jtnm7wuq6z4lsc5s9qyyssqywxn7w23u3k22gyjrnngqxre6c96krjlm00ldglu7agdfh8rx7fppen2w9g0jgdlzhggdapxjc2lj7hwxxwtcta6aplaqjw6jvwnypqpnfs008",
      "paymentHash": "aslK8yW/fgKWmMpvfmRAvqajK7lKRtBxZ/Ez+F/PjMQ=",
      "amount": "250"
    },
    {
      "id": 9,
      "employeeId": 1,
      "timeCreated": "2022-03-28T16:58:01.519Z",
      "timePaid": "2022-03-28T16:58:01.565Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:58:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6gepp5fk67j2fmmxx5ena78c2k9lf5drnu8jngdaxne28gc9txaf8m4y9sdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5xtluq9hve07h7k33exzxpy5xz3kz0muwp8t8v6vwp6cu5035emnq9qyyssqupylq8ty0yhz2yfeu0y8dclwzh0ejtl6at9m78y48ax4ql0xj8azujsyg69sqhqvqucaw8v8jjvu5spqctnkzd20jre5alfcuncavncpepn5k6",
      "paymentHash": "TbXpKTvZjUzPvj4VYv00aOfDymhvTTyo6MFWbqT7qQs=",
      "amount": "150"
    },
    {
      "id": 10,
      "employeeId": 2,
      "timeCreated": "2022-03-28T16:59:01.737Z",
      "timePaid": "2022-03-28T16:59:01.779Z",
      "isPaid": false,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:59:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr624pp5r6lmdj74ctg3gqmpq65ard4w00p3t7d2wdm6ehd9qey3l40qkxwqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp54txdcuteff75hwxs8cpx9h9pq9rcl6d9u2wqm2rj59aj5jd2xkwq9qyyssqqaqwr5jwpvexnntggyywmjh0pdk37zvpwtmqfzxtgt8us04gpwkrnqfxg4yk9j7h4pugyryd9qf0xj3hxcserfhskcftda5gkfs6rcgqqy0dhx",
      "paymentHash": "Hr+2y9XC0RQDYQap0baue8MV+apzd6zdpQZJH9XgsZw=",
      "amount": "250"
    },
    {
      "id": 11,
      "employeeId": 1,
      "timeCreated": "2022-03-28T16:59:01.737Z",
      "timePaid": "2022-03-28T16:59:01.762Z",
      "isPaid": false,
      "description": "Transaction for employId MINUTES at 3/28/2022, 5:59:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr624pp5ysgasepu2ldfy0r2a3k449q96sgjqqp5khkxu5rp5nk3ckxn3sasdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5sew06wqnh3ag0dgdm2edetrdl7ff5k6f6773r3090uvnldne408q9qyyssqslrzzvqy7manfynpy86ekh2qd7rl5z5mys74n5cu7tnzjyzkjk9kmltuq88ejl3afs2unxt84qtwaar050eamh6f5de75d5jxn2ec6qq2dqkhy",
      "paymentHash": "JBHYZDxX2pI8auxtWpQF1BEgADS17G5QYaTtHFjTjDs=",
      "amount": "150"
    },
    {
      "id": 12,
      "employeeId": 2,
      "timeCreated": "2022-03-28T17:00:01.983Z",
      "timePaid": "2022-03-28T17:00:02.004Z",
      "isPaid": false,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:00:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr6vjpp5y5khjmxfakxnyp295zyd0yhtk36tj5mjutla6d5usvef0zl3ydzsdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5u39e528d4c64jwujehzg2hh9ma962qm2vmjc5cmc69qxuqg7wrkq9qyyssqmsdf53tl98emkxzapp5w4887y6zquzeny8s7us7v2a7zm6672zgxjhagha9t7804kcncvgd4w5vyjlwc9yxecw6urtmy23fzv78q2hsqxfsell",
      "paymentHash": "JS15bMntjTIFRaCI15LrtHS5U3Li/902nIMyl4vxI0U=",
      "amount": "250"
    },
    {
      "id": 13,
      "employeeId": 1,
      "timeCreated": "2022-03-28T17:00:01.984Z",
      "timePaid": "2022-03-28T17:00:02.020Z",
      "isPaid": false,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:00:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6vjpp5qulelqxjh2na9r5n3nag70tth22xq5wwzkt4jm3le6mcd2ndadqsdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5ag5laj36esy5ca5wwz0lagwmspnqsvydc7ll25rnmmd7yzda3qws9qyyssqsetqz70f2j8rty6374cr6fqwn4473mmla5ef93f7t5p8eygun9wj4u7pghgfdkn09f4e7f5ntt9qsg2lh03ugvs0f49hzhxltpsf5kcq8tnwvm",
      "paymentHash": "Bz+fgNK6p9KOk4z6jz1rupRgUc4Vl1luP863hqpt60E=",
      "amount": "150"
    },
    {
      "id": 14,
      "employeeId": 2,
      "timeCreated": "2022-03-28T17:01:01.183Z",
      "timePaid": "2022-03-28T17:01:01.203Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:01:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr6wdpp5as77ql9ucea64l3g3h2sypa4vrvlsd9pyej8x8zaujkrlfrtgnusdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5cuxnew7vxwsgzfyn6yq4ydxn09mapjuzq0xj4kphgzhcgadqctzq9qyyssqgy7jgtvf8q5hman2anmmzzvffn6c79d3jj2x8dnr2aqujqf92q3yk8hd9ket48qqmja3mfpgfvj5wf0mss7jvmnpw54eyxgj59nkdxcq975mlp",
      "paymentHash": "7D3gfLzGe6r+KI3VAge1YNn4NKEmZHMcXeSsP6RrRPk=",
      "amount": "250"
    },
    {
      "id": 15,
      "employeeId": 1,
      "timeCreated": "2022-03-28T17:01:01.184Z",
      "timePaid": "2022-03-28T17:01:01.220Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:01:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6wdpp57hd232tv289v6qu5u2zwja5shjccuuf0ajxwy2mp8xu7nm4uefsqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5a8ctq3c0q5gwdx65atn4a9n0hc4yhr432pkx3c822sqh5xkyjmds9qyyssqtm8gl0qm0dyvjyvpqzaalkekeayjjcsctmpcnpp473lfj3tjqtus5yurj35x05jrek8qk72kh3fap4svudemulwwtuv2rxu7t3f9k0qpkcqv2k",
      "paymentHash": "9dqoqWxRys0DlOKE6XaQvLGOcS/sjOIrYTm56e68ymA=",
      "amount": "150"
    },
    {
      "id": 16,
      "employeeId": 1,
      "timeCreated": "2022-03-28T17:02:01.395Z",
      "timePaid": "2022-03-28T17:02:01.419Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:02:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6sfpp5k6dtf29rq2686ya36p92an0wa4a022qvs3wdlmlhxftyj0h593usdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5s8kuuv02llcz3tz0enr80ve6z2n7jdxyly2g89n5xh6tg87m88nq9qyyssqssj570wqj93qdr5ctraqv8sffve3ej5psnmzvl5vygqlhw4rnvrjmspqe3jm3pvkcnf32hq5z73dzvqkl8hs8aqsxansumu3za8f89cqgt33tj",
      "paymentHash": "tpq0qKMCtH0TsdBKrs3u7Xr1KAyEXN/v9zJWST70LHk=",
      "amount": "150"
    },
    {
      "id": 17,
      "employeeId": 2,
      "timeCreated": "2022-03-28T17:02:01.396Z",
      "timePaid": "2022-03-28T17:02:01.450Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:02:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr6sfpp5zgxdaluq860qegj64xxldtks3z3dejfl92mcc7lkakqalf503pgsdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp58knwfzxg7s2vel7unt4frjs8fkgxx72fpvl0t89rtx3u202q4yvq9qyyssqcca9x349q5gp7c9xgflcd3335ag0yz8w3yfw8ldfhp05z2rn2r2ymyv0ucdz6mw5c54pmw59069ekmv7swrlte4mwlxs87cz4xx2ttcph9upse",
      "paymentHash": "Egze/4A+ngyiWqmN9q7QiKLcyT8qt4x79u2B36aPiFE=",
      "amount": "250"
    },
    {
      "id": 18,
      "employeeId": 2,
      "timeCreated": "2022-03-28T17:03:01.883Z",
      "timePaid": "2022-03-28T17:03:01.905Z",
      "isPaid": false,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:03:01 PM",
      "paymentRequest": "lnbcrt2500n1p3yr6j9pp5j4kpu9njxungdw045wm5f8wzfrdwcgj8vw7qa2658r5rcsq6vxfqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp52338efmkscspuee7w8wx620rv94yscm2nm0j47rg2t2zw25v0lhq9qyyssq0ngg9fqv3mdvps20dc52478g8l6yzmy7mqfzldfkvmt6h750rc0pg6807ddf6dy0lm37du4m3jdvmxq30eu7eg0jzrls7r6n8p4wvygpvjg66l",
      "paymentHash": "lWweFnI3Joa59aO3RJ3CSNrsIkdjvA6rVDjoPEAaYZI=",
      "amount": "250"
    },
    {
      "id": 19,
      "employeeId": 1,
      "timeCreated": "2022-03-28T17:03:01.883Z",
      "timePaid": "2022-03-28T17:03:01.921Z",
      "isPaid": true,
      "description": "Transaction for employId MINUTES at 3/28/2022, 6:03:01 PM",
      "paymentRequest": "lnbcrt1500n1p3yr6j9pp5670he2gd3w63xeetahwul72nws04rxlza2vt0ef964j3h77dw6rqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp56zfky8dssxlkhdrr06kvy4q5mx8c2d3xcxlk68c6tc8vs6c6aavq9qyyssqrh0j9jc7n87lq9vcc3tkrvt7phc3q5hgrcmvtuz2yl6qeuhp6f3hewykkknavdq3njjzn530pdt64nv06f7x3mpjj9j8nnsfv6jejxspt6tpra",
      "paymentHash": "1598qQ2LtRNnK+3dz/lTdB9Rm+LqmLflJdVlG/vNdoY=",
      "amount": "150"
    }
  ]

export const TransactionTable = (props:any) => {
  const transactions = TRANSACTIONS || [];
  if (transactions.length < 1) return <EmptyState />;

  return (
    <div className="container max-w-6xl h-96 overflow-scroll">
      <div className="py-1">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Amount (sats)
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Comment
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Date Created
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Date Paid
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((data) => (
                  <tr key={data.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {ellipsisSandwich(data.paymentRequest, 5)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {commaify(data.amount)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap whitespace-nowrap text-ellipsis overflow-hidden w-48">
                        {data.description}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {data.isPaid ? (
                        <span className="relative text-center flex justify-center px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative uppercase text-xs">
                            paid
                          </span>
                        </span>
                      ) : (
                        <span className="relative text-center flex justify-center px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative uppercase text-xs">
                            not paid
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(data.timeCreated).format('MMM Do, LT')}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(data.timePaid).format('MMM Do, LT')}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
