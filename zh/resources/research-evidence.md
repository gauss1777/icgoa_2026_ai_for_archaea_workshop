# AI 辅助古菌研究：逐项结论的教学证据导图

研究截止日期：**2026 年 10 月 2 日**。本档案对原始研究作定向叙述性综合，不是穷尽式系统综述、计算复现或公认“最佳论文”榜单。以下内容均为转述，每个条目均注明实际阅读范围。英文原题和原文定位名称保留供检索。

## 阅读前先区分四件事

- **纳入训练与经过应用评测不同：** 通用模型的训练数据包含古菌序列，并不能证明它适用于某项古菌任务。反过来，Evo 2 报告了古菌基因必需性评测，只说它“训练时包含古菌”也不准确。
- **预测与观察不同：** 折叠置信度、分子动力学和模型间的一致性仍是计算证据。对筛选后候选开展抗菌实验，提供的是另一类证据，且只适用于相应检测条件。
- **证据对象与生物学结论不同：** 与宿主关联的元件、表达的基因、结构域和甲烷转化速率不能相互替代。
- **参考标签与真实情况不同：** 经人工整理的基准仍可能遗漏或标错。应验证指定目标，而不是将参考标注当作绝对真值。

## 五篇核心论文

### R01：深度学习在古菌蛋白质组中发现抗菌肽

英文原题：*Deep learning reveals antibiotics in the archaeal proteome*

- 来源：[10.1038/s41564-025-02061-0](https://www.nature.com/articles/s41564-025-02061-0)；2025-08-12。已通过同行评审。
- 生物学背景：从古菌蛋白质组中挖掘候选肽，并针对细菌病原体检测其活性。
- AI／方法的作用：利用 APEX 1.1 深度学习模型确定候选肽的优先验证顺序。
- 应用范围：直接应用于古菌序列，并对筛选出的部分候选开展实验验证。
- 证据支持的结论：研究挖掘了 233 个古菌蛋白质组，优选出 12,623 个候选；在筛选后合成并检测的 80 条肽中，75 条对至少一种受试细菌菌株具有活性。
- 结论边界：这一命中率的分母是经过筛选的实验集合，而非全部预测候选。小鼠模型中的证据不等于人体临床疗效，也不能证明这些肽在古菌中天然发挥抗菌作用。
- 原文定位：结果：深度学习引导的候选识别、抗菌活性；摘要。
- 原始定位名称：`Results: Deep-learning-guided identification; Antimicrobial activity; abstract`。
- 实际阅读范围：元数据、摘要及部分结果段落。
- 学习问题：所报告命中率的统计分母是什么？哪些更强的结论还需要新的实验？

### R02：古菌域中的组蛋白多样性

英文原题：*Histone diversity in the archaeal domain of life*

- 来源：[10.1038/s41467-026-71849-3](https://www.nature.com/articles/s41467-026-71849-3)；2026-04-15；正式出版版本（Version of Record）日期为 2026-06-12。已通过同行评审。
- 生物学背景：基于 GTDB 第 220 版考察古菌组蛋白的序列多样性。
- AI／方法的作用：理化特征聚类、AlphaFold3 结构预测与分子动力学模拟。
- 应用范围：直接针对古菌开展计算分析。
- 证据支持的结论：研究将古菌组蛋白聚类与结构预测、模拟相结合；部分预测的类核小体排列在模拟中不稳定。
- 结论边界：预测与模拟的结合仍属于计算证据，不能证明这些候选组装体在活古菌细胞内如何组织 DNA。
- 原文定位：结果中的结构预测部分；图 5；讨论；方法中的结构预测部分。
- 原始定位名称：`Results: structural prediction; Fig. 5; Discussion; Methods: Structural prediction`。
- 实际阅读范围：元数据及部分结果、讨论和方法段落。
- 学习问题：两项计算分析是否构成独立的实验确认？仍缺少哪种生物学观察？

### R03：利用 Evo 2 对生命各域的基因组进行建模与设计

英文原题：*Genome modelling and design across all domains of life with Evo 2*

- 来源：[10.1038/s41586-026-10176-5](https://www.nature.com/articles/s41586-026-10176-5)；2026-03-04。已通过同行评审。
- 生物学背景：跨生命域的基因组数据，包括古菌基因必需性评测。
- AI／方法的作用：基因组基础模型；对提前终止扰动进行零样本评分。
- 应用范围：通用模型，论文报告了古菌任务的评测结果。
- 证据支持的结论：论文报告了零样本基因必需性预测，并在细菌、古菌及噬菌体物种中利用实验标签进行评估。
- 结论边界：古菌任务评测比“训练集含有古菌序列”更具体，但不能证明模型生成的古菌基因组能够存活，也不能证明对所有谱系和任务都具有泛化能力。
- 原文定位：图 2j；结果中的基因必需性段落；扩展数据图 3h。
- 原始定位名称：`Fig. 2j; gene-essentiality Results paragraph; Extended Data Fig. 3h`。
- 实际阅读范围：元数据、部分结果段落与图注。
- 学习问题：哪些证据支持古菌预测任务？哪些更广泛的基因组设计结论尚无证据支持？

### R04：甲烷氧化古菌的巨型环状染色体外元件：多样的代谢与防御基因库

英文原题：*Jumbo circular extrachromosomal elements of methane-oxidizing archaea with variably extensive metabolic and defense gene repertoires*

- 来源：[10.1038/s41467-026-74423-z](https://www.nature.com/articles/s41467-026-74423-z)；2026。已通过同行评审。
- 生物学背景：Methanoperedens 及其相关染色体外元件。
- AI／方法的作用：结合基因组与转录证据，并使用 ColabFold 和 AlphaFold3 构建结构模型。
- 应用范围：在综合生物学研究中利用 AI 辅助古菌注释。
- 证据支持的结论：研究综合了古菌染色体外元件的基因组与表达证据，并随数据公开了专门构建的 ColabFold/AlphaFold3 模型。
- 结论边界：预测折叠、被转录的基因和实测代谢效应是不同的证据对象；不能仅凭模型就推断甲烷转化发生了变化。
- 原文定位：摘要；结果中的元件与宿主关联部分；数据可用性声明。
- 原始定位名称：`Abstract; Results: ECE-host association; Data availability`。
- 实际阅读范围：原文 HTML 的部分段落，以及 PDF 中的摘要和数据可用性段落。
- 学习问题：哪些证据支持元件与宿主的关联？要确认其编码基因的生理效应，还需什么证据？

### R05：甲烷杆菌目物种中黏附素样蛋白的比较分析

英文原题：*Comparative analysis of adhesin-like proteins from Methanobacteriales species*

- 来源：[10.3389/fmicb.2026.1897686](https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2026.1897686/full)；2026-09-29。已通过同行评审。
- 生物学背景：甲烷杆菌目（Methanobacteriales），包括肠道和瘤胃相关谱系。
- AI／方法的作用：AlphaFold 辅助结构分析与 PRISM 结构域识别。
- 应用范围：直接针对古菌进行结构域注释。
- 证据支持的结论：论文比较了 17 个物种的黏附素样蛋白架构，并介绍了结合人工整理与模型辅助的结构域识别。
- 结论边界：超过 5,000 个残基的蛋白未纳入预测。论文将 PRISM 相关稿件描述为正在准备中，本轮阅读未核实其可执行软件的发布情况。结构域标签不能证明黏附机制。
- 原文定位：方法中的序列获取与结构建模部分；ALP 结构域表征部分；讨论。
- 原始定位名称：`Methods: Sequence retrieval and structural modeling; Characterization of ALP domains; Discussion`。
- 实际阅读范围：元数据、摘要及部分方法和讨论段落。
- 学习问题：序列长度筛选、参考注释和评测集划分如何限制生物学结论？

## 拓展阅读，不增加核心练习负担

### R06：利用 Seq2Symm 快速、准确地预测蛋白质同源寡聚体的对称性

英文原题：*Rapid and accurate prediction of protein homo-oligomer symmetry using Seq2Symm*

来源：[10.1038/s41467-025-57148-3](https://www.nature.com/articles/s41467-025-57148-3)；2025-02-27。作为多蛋白质组分析的一部分，Seq2Symm 被应用于 Pyrococcus furiosus 的蛋白质组。

结论边界：蛋白质组尺度的预测不等于对每个古菌寡聚体都进行了独立的物理实验验证。

实际阅读范围：元数据及部分结果段落。原文定位：结果中的多蛋白质组应用部分；图 4；原始名称：`Results: multi-proteome application; Fig. 4`。

### R07：用于冷冻电子断层成像数据标注评测的逼真模体数据集

英文原题：*A realistic phantom dataset for benchmarking cryo-ET data annotation*

来源：[10.1038/s41592-025-02800-5](https://www.nature.com/articles/s41592-025-02800-5)；2025-08-26。该模体基准将断层重构图像与人工整理的标注相对应；作者明确指出，标注可能不完整，也可能含有假阳性。

结论边界：人工整理的参考真值并非绝对正确；模型在模体上的表现不能证明其能够完成古菌细胞分割或判定分子身份。

实际阅读范围：元数据及部分结果和方法段落。原文定位：结果中的数据集质量与参考真值局限部分；CryoET Data Portal 数据集 10310；原始名称：`Results: dataset quality and ground-truth limitations; CryoET Data Portal deposition 10310`。

## 待跟踪条目与未完成的来源获取

### R08：MGM2：用于探索微生物组的统一基础模型

英文原题：*MGM2 as a Unified Foundation Model for Microbiome World Exploration*

来源：[10.64898/2026.07.20.739063](https://www.biorxiv.org/content/10.64898/2026.07.20.739063v1.full)。状态：预印本，第 1 版；待跟踪条目。

实际阅读范围：仅阅读原始页面的索引段落；完整页面访问受阻。本轮阅读未能打开完整原始页面。此条目不代表方法复现或因果验证，也不是核心教学的必选内容。

教学问题：哪些对照能够区分生态特征与研究项目或检测流程造成的伪影？

### R09：既有成像模块引用的 CryoForge 预印本

英文条目名：*CryoForge preprint referenced by the existing imaging module*

来源：[10.64898/2026.08.15.745007](https://doi.org/10.64898/2026.08.15.745007)。状态：预印本；2026 年 8 月模块引用第 1 版，本轮复核未完成。

实际阅读范围：既有公开模块；原始来源复核未完成。本轮阅读未能取得原始全文，DOI/API 获取也失败。不能依据二手摘要补充实现细节、代码发布或运行轨迹性能方面的结论。

教学问题：在不声称复现 CryoForge 实现的前提下，哪些流程治理概念仍可讨论？

DOI 后缀不能直接当作独立确认过的发表日期。来源无法访问是一项缺口，不是研究无效的证据。以上两个待跟踪条目均非核心学习练习的必选内容。

## 实现边界

本仓库提供阅读与核验材料，不实现 APEX、AlphaFold、Evo 2、PRISM、Seq2Symm、MGM2、CryoForge 或显微成像方法。不包含外部模型调用、基因组生成、湿实验操作规程或新的生物学结果。

请配合[学习工作表](../training/learner-worksheet.md)、[CSV 模板](../training/source-audit-template.csv)和[浏览器研究证据页](../research-updates.html)使用。
