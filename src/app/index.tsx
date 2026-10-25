import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Post = {
  title: string;
  body: string;
};

export default function ConsumoApiScreen() {
  // Estados para dados, carregamento e erros
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        // Consultando a API usando axios.get
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

        // Salvando esses dados no estado
        setPost(response.data);
      } catch (err) {
        // Tratando possiveis erros usando try/catch
        console.error("Erro ao buscar dados:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  // IF que apresenta uma telinha de carregamento enquanto os dados são buscados
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={styles.textoMensagem}>Carregando dados da API...</Text>
      </View>
    );
  }

  // IF que mostra tela de erro caso ocorra erro na busca dos dados
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.textoErro}>Ops! Ocorreu um erro ao buscar a publicação.</Text>
      </View>
    );
  }

  // Aqui vai exibir o título e o conteúdo (body) que vem da API
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ATIVIDADE REPOSIÇÃO (PDM)</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.linhaDecorativa} />
          <Text style={styles.titulo}>{post?.title}</Text>
          <Text style={styles.conteudo}>{post?.body}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F9',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748B',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  linhaDecorativa: {
    width: 32,
    height: 4,
    backgroundColor: '#0066FF',
    borderRadius: 2,
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F5F9',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  conteudo: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
  textoMensagem: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
  },
  textoErro: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: 'bold',
  }
});