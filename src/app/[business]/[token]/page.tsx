import ClientChart from "@/components/ui/chart";
import { createClient } from "@/utils/supabase/server";
import { decryptToken } from "@/utils/token";
import { BusinessTokenProps, Report } from "@/utils/types";
import { MessageCircleMore, MessageCircleOff, MessageCirclePlus, UsersRound } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const aiAnalysis = `## Relatório de Desempenho de Atendentes - Junho de 2025\n\nEste relatório analisa o desempenho dos atendentes de suporte em junho de 2025, com base nos dados fornecidos.  A análise considera volume de atendimento, tempo de atendimento e identificação de operadores que necessitam de atenção especial.\n\n**1. Volume de Atendimento:**\n\n* **Maior Volume:** Vinícius - Suporte (Departamento Sistemas) teve o maior volume de atendimento, com 90 tickets fechados e 42 contatos atendidos.  Otávio - Suporte (Departamento Sistemas) também apresentou um alto volume, com 71 tickets fechados e 32 contatos. Raphael - Websites se destaca com 36 tickets fechados e 14 contatos.\n\n* **Nenhuma Atividade:** Vinícius - Suporte (Departamento \"Sem Robô\") e Otávio - Suporte (Departamento \"Sem Robô\") não registraram nenhuma atividade durante o período.  É necessário investigar a razão dessa inatividade.\n\n**2. Operadores que Necessitam de Mais Atenção:**\n\n* **Tempo Médio de Atendimento Muito Alto:** Fátima - Administrativo apresenta um tempo médio de atendimento extremamente alto (59:09:41 por ticket).  Isso requer investigação imediata para identificar as causas e propor soluções.  Jaqueline - Web também apresenta um tempo de espera após o bot muito alto (162:01:34).\n\n* **Tempo Médio de Atendimento Muito Baixo (potencialmente preocupante):**  Embora um tempo baixo possa parecer positivo, é importante analisar se isso reflete eficiência ou atendimento superficial.  A análise dos tempos médios de atendimento de Jaqueline - Web (00:00:20) e Otávio - Suporte (Administrativo) (00:00:00) requer investigação para garantir a qualidade do atendimento prestado.\n\n**3. Resumo e Conclusão Geral:**\n\nO relatório indica uma disparidade significativa no volume de atendimento entre os operadores.  Alguns atendentes demonstram alta produtividade, enquanto outros apresentam inatividade ou tempos de atendimento extremamente altos ou baixos, que merecem atenção. A qualidade do atendimento precisa ser avaliada para garantir que tempos baixos não estejam comprometendo a resolução dos problemas.\n\n**4. Sugestões de Melhoria:**\n\n* **Distribuição de Carga de Trabalho:** Implementar um sistema de distribuição de tickets mais eficiente para equilibrar a carga de trabalho entre os operadores, evitando sobrecarga em alguns e inatividade em outros.\n* **Investigação de Inatividade:** Investigar a razão da inatividade de Vinícius - Suporte e Otávio - Suporte no departamento \"Sem Robô\".\n* **Análise de Casos de Fátima - Administrativo e Jaqueline - Web:** Analisar detalhadamente os tickets atendidos por Fátima - Administrativo e Jaqueline - Web para identificar as causas dos tempos de atendimento extremamente altos e baixos, respectivamente.  Considerar treinamento adicional, melhoria de processos ou suporte técnico.\n* **Monitoramento Contínuo:** Implementar um sistema de monitoramento contínuo do tempo médio de atendimento para identificar tendências e agir preventivamente.\n* **Treinamento:**  Oferecer treinamentos para melhorar a eficiência e a qualidade do atendimento, focando em técnicas de resolução de problemas e gestão de tempo.\n* **Revisão de Processos:** Revisar os processos internos para identificar gargalos e otimizar o fluxo de trabalho.\n* **Análise da utilização do Bot:** Analisar a eficácia do bot e o tempo de espera após a sua intervenção.  Ajustes podem ser necessários para otimizar o seu desempenho.\n\n\nEste relatório fornece uma visão geral do desempenho dos atendentes. Uma análise mais profunda, incluindo a avaliação da qualidade do atendimento e a satisfação do cliente, é recomendada para uma avaliação completa.\n"`;

export default async function ReportPage({ params }: BusinessTokenProps) {
  const { business, token } = await params

  const decodedToken = decryptToken(token);
  const supabase = createClient()

  const { data: businessInfo } = await supabase.from("users").select("*").ilike("business_name", business).single();
  const { data: reports, error } = await supabase.from("reports").select("*").eq("business_id", businessInfo.id).eq("period", decodedToken?.period);

  if (error) {
    console.error("Erro ao buscar reports:", error);
    return <div>Erro ao carregar dados.</div>;
  }

  function groupReportsByOperatorDepartment(reports: Report[]) {
    const grouped: Record<string, Report> = {};

    for (const report of reports) {
      const key = report?.operator;

      if (!grouped[key]) grouped[key] = { ...report };
      else {
        grouped[key] = {
          ...grouped[key],
          sent_messages_count: grouped[key].sent_messages_count + report.sent_messages_count,
          received_messages_count: grouped[key].received_messages_count + report.received_messages_count,
          total_messages_count: grouped[key].total_messages_count + report.total_messages_count,
          opened_tickets_count: grouped[key].opened_tickets_count + report.opened_tickets_count,
          closed_tickets_count: grouped[key].closed_tickets_count + report.closed_tickets_count,
          total_tickets_count: grouped[key].total_tickets_count + report.total_tickets_count,
          contacts_count: grouped[key].contacts_count + report.contacts_count,
          // tempo médio: recalcular com base em soma e count se quiser mais precisão
        };
      }
    }

    return Object.values(grouped);
  }

  const groupedReports = groupReportsByOperatorDepartment(reports || []);

  const metricValues = {
    opened: reports?.reduce((acc, report) => acc + Number(report.opened_tickets_count || 0), 0),
    closed: reports?.reduce((acc, report) => acc + Number(report.closed_tickets_count || 0), 0),
    messages: reports?.reduce((acc, report) => acc + Number(report.total_messages_count || 0), 0),
    contacts: reports?.reduce((acc, report) => acc + Number(report.contacts_count || 0), 0),
  };

  const performanceMetrics = [
    { label: "Chamados abertos", style: "text-green-600 bg-green-100", icon: <MessageCirclePlus className="w-5 h-5" />, value: metricValues.opened },
    { label: "Chamados fechados", style: "text-red-600 bg-red-100", icon: <MessageCircleOff className="w-5 h-5" />, value: metricValues.closed },
    { label: "Total de mensagens", style: "text-blue-600 bg-blue-100", icon: <MessageCircleMore className="w-5 h-5" />, value: metricValues.messages },
    { label: "Total de contatos", style: "text-purple-600 bg-purple-100", icon: <UsersRound className="w-5 h-5" />, value: metricValues.contacts }
  ];

  return (
    <main className="w-full xl:w-6xl p-4 xl:p-6 m-auto space-y-4 xl:space-y-6">
      <header className="relative w-full h-40 xl:h-80 flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/report-background.png')` }} />
        <div className="relative flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="logo da Beforce" width={217} height={115} priority />
          <h1 className="text-sm xl:text-3xl font-bold text-center text-white">RELATÓRIO DE ATENDIMENTO POR WHATSAPP</h1>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="p-3 rounded-xl border border-[#e5e7eb]">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${metric.style}`}>
                {metric.icon}
              </div>
              <span className="text-xl font-bold">
                {metric.value}
              </span>
            </div>
            <span className="text-sm text-gray-600">{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center mb-2 xl:mb-4">Atendimento por Operador</h2>
        <div className="overflow-x-auto rounded-xl border border-[#e5e7eb]">
          <table className="w-full text-sm text-left text-dark-3">
            <thead>
              <tr>
                <th className="p-4 font-semibold rounded-tl-xl bg-gray-100">Operador</th>
                <th className="p-4 max-sm:min-w-36 font-semibold text-center bg-gray-100">Tempo Médio de Atendimento</th>
                <th className="p-4 max-sm:min-w-36 font-semibold text-center bg-gray-100">Tempo Médio de 1ª Resposta</th>
                <th className="p-4 max-sm:min-w-36 font-semibold text-center bg-gray-100">Qtde de Contatos Únicos</th>
                <th className="p-4 max-sm:min-w-44 font-semibold text-center bg-gray-100">Chamados Abertos + Fechados</th>
                <th className="p-4 max-sm:min-w-44 w-40 font-semibold text-center rounded-tr-xl bg-gray-100">Média de Chamados por Dia</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {groupedReports.map((user, index) => (
                <tr key={index} className="hover:bg-red-12/25 transition">
                  <td className="p-4 font-medium">{user.operator.split(" ")[0].trim()}</td>
                  <td className="p-4 max-sm:min-w-36 text-center">{user.ticket_time}</td>
                  <td className="p-4 max-sm:min-w-36 text-center">{user.waiting_time}</td>
                  <td className="p-4 max-sm:min-w-36 text-center">{user.contacts_count}</td>
                  <td className="p-4 max-sm:min-w-44 text-center">{user.total_tickets_count}</td>
                  <td className="p-4 max-sm:min-w-44 w-40 text-center">---</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center mb-2 xl:mb-4">Chamados por Operador</h2>
        <ClientChart reports={groupedReports || []} />
      </section>

      <section className="space-y-4">
        <ReactMarkdown
          components={{
            h2: (props) => (
              <h2 className="text-2xl font-semibold text-center mb-4" {...props} />
            ),
            p: (props) => (
              <p className="leading-relaxed mb-3" {...props} />
            ),
            strong: (props) => (
              <strong className="font-semibold" {...props} />
            ),
            ul: (props) => (
              <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />
            ),
            li: (props) => (
              <li className="leading-relaxed" {...props} />
            ),
          }}
        >
          {aiAnalysis}
        </ReactMarkdown>
      </section>
    </main>
  );
}